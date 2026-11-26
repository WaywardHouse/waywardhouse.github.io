#!/usr/bin/env node
/**
 * Keep Pepper's books index (Vectorize `wh-books`) in step with the published books.
 *
 * For each book in src/content/books/_books.json it downloads <deployUrl>search.json (the index Quarto
 * already builds for every book), groups sections by page, and sends to POST /api/ingest only the
 * pages whose content hash changed. Pages that disappeared are pruned. Re-running is safe and cheap.
 *
 *   INGEST_TOKEN=... node scripts/ingest-books.mjs                 # all books
 *   INGEST_TOKEN=... node scripts/ingest-books.mjs --book=mathematics
 *   INGEST_TOKEN=... node scripts/ingest-books.mjs --dry          # list what would change; writes nothing
 *   INGEST_TOKEN=... node scripts/ingest-books.mjs --force         # re-embed everything
 *
 * Env: INGEST_TOKEN (required), INGEST_URL (default https://wayward.house/api/ingest)
 * Requires Node 20+ (global fetch and crypto).
 */

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { normalizePage } from '../worker/src/pepper-common.js';

const args  = process.argv.slice(2);
const flag  = (n) => args.includes(`--${n}`);
const opt   = (n) => (args.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1];
const DRY   = flag('dry');
const FORCE = flag('force');
const ONLY  = opt('book');
const URL_  = process.env.INGEST_URL || 'https://wayward.house/api/ingest';
const TOKEN = process.env.INGEST_TOKEN;

if (!TOKEN) { console.error('INGEST_TOKEN is not set.'); process.exit(2); }

const here  = dirname(fileURLToPath(import.meta.url));
const books = JSON.parse(readFileSync(join(here, '../src/content/books/_books.json'), 'utf8'))
  .filter((b) => b.deployUrl && (!ONLY || b.id === ONLY));

const clean = (s) => String(s ?? '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

async function api(body) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(URL_, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(body),
    });
    if (res.ok) return res.json();
    const text = await res.text();
    // Out of free Workers AI allowance: stop cleanly; the next scheduled run resumes where this left off.
    if (res.status === 503 || /4006|daily free allocation|neurons/i.test(text)) {
      throw Object.assign(new Error('Workers AI allowance exhausted; stopping. Re-run after 00:00 UTC.'), { quota: true });
    }
    if (attempt >= 3 || res.status < 500) throw new Error(`${body.op} ${res.status}: ${text.slice(0, 200)}`);
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
}

let totalChanged = 0, totalKept = 0, totalPruned = 0, failures = 0;

for (const b of books) {
  const base = b.deployUrl.replace(/\/?$/, '/');
  let entries;
  try {
    const res = await fetch(`${base}search.json`);
    if (!res.ok) { console.log(`- ${b.id}: no search.json (${res.status}), skipped`); continue; }
    entries = await res.json();
  } catch (e) { console.log(`- ${b.id}: unreachable (${e.message}), skipped`); continue; }

  // Group sections by page.
  const pages = new Map();
  for (const e of entries) {
    const [path, anchor = ''] = String(e.href || '').split('#');
    const page = normalizePage(path);
    if (!pages.has(page)) pages.set(page, { title: clean(e.title), entries: [] });
    const p = pages.get(page);
    if (!p.title) p.title = clean(e.title);
    const text = clean(e.text);
    if (text) p.entries.push({ section: clean(e.section), anchor, text });
  }

  const { pages: have } = await api({ op: 'manifest', book: b.id });
  let changed = 0, kept = 0;
  for (const [page, p] of pages) {
    const hash = createHash('sha1').update(JSON.stringify([p.title, p.entries])).digest('hex').slice(0, 16);
    if (!FORCE && have[page] === hash) { kept++; continue; }
    changed++;
    if (DRY) { console.log(`  would update ${b.id}/${page} (${p.entries.length} sections)`); continue; }
    try {
      const r = await api({ op: 'upsert', book: b.id, page, hash, title: p.title, entries: p.entries });
      console.log(`  ${b.id}/${page}: ${r.chunks} chunks`);
    } catch (e) {
      if (e.quota) { console.error(e.message); process.exit(3); }
      failures++; console.error(`  FAILED ${b.id}/${page}: ${e.message}`);
    }
  }

  let pruned = 0;
  if (!DRY && pages.size > 0) pruned = (await api({ op: 'prune', book: b.id, keep: [...pages.keys()] })).removed;
  console.log(`${b.id}: ${pages.size} pages, ${changed} ${DRY ? 'to update' : 'updated'}, ${kept} unchanged, ${pruned} pruned`);
  totalChanged += changed; totalKept += kept; totalPruned += pruned;
}

console.log(`\nDone. ${totalChanged} ${DRY ? 'would change' : 'updated'}, ${totalKept} unchanged, ${totalPruned} pruned, ${failures} failed.`);
process.exit(failures ? 1 : 0);
