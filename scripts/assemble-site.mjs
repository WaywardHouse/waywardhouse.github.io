/**
 * Post-build step: fold the Quarto sub-sites into dist/ and write redirect stubs.
 *
 * Runs after `astro build`, before Pagefind (so essays and signals are searchable).
 *
 * 1. Copies the rendered wh-essays and wh-signals sites into dist/essays/ and
 *    dist/signals/. Files the hub already built (e.g. the /essays/ and
 *    /signals/ listing pages) are never overwritten — the hub owns them.
 *    This replaces the old Cloudflare Pages Function proxy.
 *
 * 2. Writes static redirect pages (GitHub Pages has no _redirects support):
 *      /essays/<slug>/            → /essays/<slug>     (trailing-slash links)
 *      /signals/<slug>/           → /signals/<slug>
 *      /articles/<slug>[/]        → /essays/<slug>     (old Quarto site URLs)
 *      /articles/system-signals-NNN → /signals/issue-NNN
 *      /learn/<book>/             → /<book>/
 *
 * Sub-site locations default to sibling checkouts; CI sets them explicitly:
 *   ESSAYS_SITE=../wh-essays/_site  SIGNALS_SITE=../wh-signals/_site
 * A missing sub-site is skipped with a warning so local `npm run build` works.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const SUBSITES = [
  { prefix: 'essays',  src: process.env.ESSAYS_SITE  || join(root, '..', 'wh-essays', '_site') },
  { prefix: 'signals', src: process.env.SIGNALS_SITE || join(root, '..', 'wh-signals', '_site') },
];

const books = JSON.parse(readFileSync(join(root, 'src/content/books/_books.json'), 'utf8'));

let copied = 0;
let stubs  = 0;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function redirectStub(path, target) {
  const file = join(dist, path, 'index.html');
  if (existsSync(file)) return;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="https://wayward.house${target}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head><body><a href="${target}">Continue to ${target}</a></body></html>
`);
  stubs++;
}

// ── 1. Sub-sites ─────────────────────────────────────────────────────────────
const pages = {};
for (const { prefix, src } of SUBSITES) {
  if (!existsSync(src)) {
    console.warn(`assemble-site: ${src} not found — skipping /${prefix}/`);
    continue;
  }
  for (const file of walk(src)) {
    const rel  = relative(src, file);
    const dest = join(dist, prefix, rel);
    if (existsSync(dest)) continue;
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(file, dest);
    copied++;
  }
  pages[prefix] = readdirSync(src)
    .filter((f) => f.endsWith('.html') && f !== 'index.html' && f !== '404.html')
    .map((f) => f.slice(0, -'.html'.length));
}

// ── 2. Redirect stubs ────────────────────────────────────────────────────────
for (const [prefix, slugs] of Object.entries(pages)) {
  for (const slug of slugs) redirectStub(`${prefix}/${slug}`, `/${prefix}/${slug}`);
}

for (const slug of pages.essays ?? []) {
  redirectStub(`articles/${slug}`, `/essays/${slug}`);
}
for (const n of ['001', '002', '003', '004']) {
  redirectStub(`articles/system-signals-${n}`, `/signals/issue-${n}`);
}
redirectStub('articles', '/essays/');

for (const { slug } of books) {
  redirectStub(`learn/${slug}`, `/${slug}/`);
}

console.log(`assemble-site: copied ${copied} sub-site files, wrote ${stubs} redirect stubs`);
