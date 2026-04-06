/**
 * core.js — Loom theme visualization runtime
 *
 * Registry-driven: reads REGISTRY from viz-registry.js, detects which
 * libraries are needed, loads CDN assets, initialises adapters, renders
 * per-element visualisations, and wires scrolly step updates.
 *
 * ── How it works ──────────────────────────────────────────────────────────────
 *   1. Detection  — each registry entry's detect() is called.
 *   2. CDN load   — styles + scripts for detected libraries are loaded.
 *   3. Init       — optional one-time init() is called (KaTeX, Mermaid).
 *   4. Render     — for entries with a selector, each matching element
 *                   gets render(el, options) called.
 *   5. Scrolly    — story:step events from narrative.js are routed to
 *                   the matching element's update() based on data-update JSON.
 *
 * ── Adding a new library ──────────────────────────────────────────────────────
 *   1. Create assets/js/viz/your-lib.js  (init, render, update exports)
 *   2. Add an entry to REGISTRY in viz-registry.js
 *   3. Add a body-class flag in _layouts/default.html if needed
 *   4. Add the flag to post front matter
 *
 * Body-class flags (set by Jekyll layouts via front matter):
 *   math: true     → tag-hash-math
 *   diagram: true  → tag-hash-diagram
 *   viz: true      → tag-hash-viz
 *   geo: true      → tag-hash-geo
 *   leaflet: true  → tag-hash-leaflet
 *   d3: true       → tag-hash-d3
 *   story: true    → tag-hash-story  (used by essay/core.js for Scrollama)
 */

import { REGISTRY } from './viz-registry.js';

// ── CDN loaders ───────────────────────────────────────────────────────────────

function loadStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = href;
  l.crossOrigin = 'anonymous';
  document.head.appendChild(l);
}

function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve();
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.crossOrigin = 'anonymous';
    s.onload  = resolve;
    s.onerror = resolve; // resolve on error so await doesn't hang
    document.head.appendChild(s);
  });
}

async function loadCDN({ styles = [], scripts = [] } = {}) {
  styles.forEach(loadStyle);
  for (const src of scripts) await loadScript(src);
}

// ── Element ID helper ─────────────────────────────────────────────────────────

let autoId = 0;
function ensureId(el) {
  if (!el.id) el.id = `loom-viz-${++autoId}`;
  return el.id;
}

// ── Instance store ────────────────────────────────────────────────────────────
// Maps element id → { entry, el, instance } so scrolly updates can look up
// the right adapter + instance by the id in data-update JSON.

const instances = new Map();

// ── Scrolly wiring ────────────────────────────────────────────────────────────
// narrative.js dispatches story:step (bubbles: true) with detail.element
// pointing to the active story step element.
//
// If that element has data-update JSON, core.js routes each key → the
// matching registry entry's update() function.
//
// Example step element:
//   <div class="story-step" data-step="1"
//        data-update='{"city-map": {"lat": 48.858, "lng": 2.295, "zoom": 14}}'>

function wireScrolly() {
  document.addEventListener('story:step', (e) => {
    const stepEl = e.detail?.element;
    if (!stepEl?.dataset.update) return;

    let updates;
    try {
      updates = JSON.parse(stepEl.dataset.update);
    } catch {
      return;
    }

    Object.entries(updates).forEach(([id, data]) => {
      const rec = instances.get(id);
      if (!rec?.entry.update) return;
      rec.entry.update(rec.el, data, rec.instance);
    });
  });
}

// ── Reading progress bar ──────────────────────────────────────────────────────
// Adds a fixed 2px progress bar at the top of the viewport on post pages.
// Essay pages already get this from essay/progress.js; skipped here to avoid
// double-mounting.

function initPostProgress() {
  if (document.getElementById('essay-content')) return; // essay handles it
  if (!document.querySelector('.post-main')) return;    // only on post pages

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bar = document.createElement('div');
  bar.className = 'essay-progress-bar';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Reading progress');
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.setAttribute('aria-valuenow', '0');
  document.body.prepend(bar);

  if (prefersReduced) return;

  let ticking = false;

  function update() {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? Math.min(100, (scrolled / maxScroll) * 100) : 0;
    bar.style.setProperty('--progress', `${pct}%`);
    bar.setAttribute('aria-valuenow', Math.round(pct));
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

// ── Copy buttons ──────────────────────────────────────────────────────────────
// Adds a "Copy" button to every <pre><code> block in .gh-content.
// essay/core.js does the same for #essay-content; this covers regular posts.
// Skipped on essay pages to avoid double-adding buttons.

function addCopyButtons() {
  if (document.getElementById('essay-content')) return; // essay/core.js handles it
  document.querySelectorAll('.gh-content pre > code').forEach((code) => {
    const pre = code.parentElement;
    if (pre.querySelector('.copy-btn')) return;

    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent ?? '');
        btn.textContent = 'Copied!';
        btn.classList.add('copy-btn--done');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copy-btn--done');
        }, 2000);
      } catch {
        btn.textContent = 'Error';
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

function shouldMountBackToTop() {
  return Boolean(
    document.body.classList.contains('reading-body') ||
    document.querySelector('#essay-content, .post-main, #quarto-document-content')
  );
}

function initBackToTop() {
  if (!shouldMountBackToTop()) return;
  if (document.querySelector('.back-to-top')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.innerHTML = '<span aria-hidden="true">↑</span><span>Top</span>';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  function updateVisibility() {
    const scrolled = window.scrollY || document.documentElement.scrollTop || 0;
    const longPage = document.documentElement.scrollHeight > window.innerHeight * 1.5;
    button.classList.toggle('is-visible', longPage && scrolled > Math.max(420, window.innerHeight * 0.7));
    ticking = false;
  }

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateVisibility, { passive: true });
  document.body.appendChild(button);
  updateVisibility();
}

function headerIcon(kind) {
  const icons = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m15.2 15.2 4.1 4.1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  };

  return icons[kind] || '';
}

const siteSearchState = {
  dialog: null,
  documents: [],
  input: null,
  results: null,
  status: null,
  promise: null,
};

function stripHtml(text = '') {
  const temp = document.createElement('div');
  temp.innerHTML = text;
  return temp.textContent?.trim() || '';
}

function getSiteSearchIndexUrl() {
  return new URL('../../search.json', import.meta.url);
}

function buildSiteSearchDocuments(records = []) {
  const grouped = new Map();
  const baseUrl = getSiteSearchIndexUrl();

  records.forEach((record) => {
    const rawHref = record.href || record.objectID || '';
    const pageHref = rawHref.split('#')[0];
    if (!pageHref) return;

    const key = pageHref;
    const section = stripHtml(record.section || '');
    const bodyText = stripHtml(record.text || '');

    if (!grouped.has(key)) {
      grouped.set(key, {
        href: new URL(pageHref, baseUrl).toString(),
        title: stripHtml(record.title || ''),
        section,
        body: bodyText,
      });
      return;
    }

    const existing = grouped.get(key);
    existing.body = `${existing.body} ${bodyText}`.trim();
    if (!existing.section && section) existing.section = section;
  });

  return Array.from(grouped.values());
}

async function loadSiteSearchIndex() {
  if (!siteSearchState.promise) {
    siteSearchState.promise = fetch(getSiteSearchIndexUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search index unavailable (${response.status})`);
        }
        return response.json();
      })
      .then((records) => buildSiteSearchDocuments(records));
  }

  return siteSearchState.promise;
}

function rankSiteSearchResults(query, documents) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const terms = trimmed.split(/\s+/).filter(Boolean);

  return documents
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const section = doc.section.toLowerCase();
      const body = doc.body.toLowerCase();
      let score = 0;

      for (const term of terms) {
        const inTitle = title.includes(term);
        const inSection = section.includes(term);
        const inBody = body.includes(term);

        if (!inTitle && !inSection && !inBody) {
          return null;
        }

        if (inTitle) score += 12;
        if (inSection) score += 7;
        if (inBody) score += 1;
      }

      return { doc, score };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score)
    .slice(0, 10);
}

function renderSiteSearchResults(query, documents = []) {
  if (!siteSearchState.results || !siteSearchState.status) return;

  const trimmed = query.trim();
  if (!trimmed) {
    siteSearchState.results.innerHTML = '';
    siteSearchState.status.textContent = 'Type to search the site and articles.';
    return;
  }

  const matches = rankSiteSearchResults(trimmed, documents);
  if (matches.length === 0) {
    siteSearchState.results.innerHTML = '';
    siteSearchState.status.textContent = 'No matching pages found.';
    return;
  }

  siteSearchState.status.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'}`;
  siteSearchState.results.innerHTML = matches.map(({ doc }) => `
    <a class="wayward-search-result" href="${doc.href}">
      <span class="wayward-search-result__title">${doc.title || 'Untitled'}</span>
      ${doc.section ? `<span class="wayward-search-result__section">${doc.section}</span>` : ''}
    </a>
  `).join('');
}

function closeSiteSearchDialog() {
  siteSearchState.dialog?.setAttribute('hidden', '');
  document.body.classList.remove('wayward-search-open');
}

function ensureSiteSearchDialog() {
  if (siteSearchState.dialog) return siteSearchState.dialog;

  const dialog = document.createElement('div');
  dialog.className = 'wayward-search-dialog';
  dialog.hidden = true;
  dialog.innerHTML = `
    <div class="wayward-search-dialog__backdrop" data-search-close></div>
    <div class="wayward-search-dialog__panel" role="dialog" aria-modal="true" aria-label="Search Wayward House">
      <div class="wayward-search-dialog__head">
        <div>
          <div class="wayward-search-dialog__eyebrow">Search</div>
          <h2 class="wayward-search-dialog__title">Find an article or page</h2>
        </div>
        <button class="wayward-search-dialog__close" type="button" aria-label="Close search" data-search-close>Close</button>
      </div>
      <label class="wayward-search-dialog__field">
        <span class="wayward-search-dialog__icon">${headerIcon('search')}</span>
        <input class="wayward-search-dialog__input" type="search" placeholder="Search the site" autocomplete="off" spellcheck="false">
      </label>
      <div class="wayward-search-dialog__status">Loading search index…</div>
      <div class="wayward-search-dialog__results"></div>
    </div>
  `;

  document.body.appendChild(dialog);

  siteSearchState.dialog = dialog;
  siteSearchState.input = dialog.querySelector('.wayward-search-dialog__input');
  siteSearchState.results = dialog.querySelector('.wayward-search-dialog__results');
  siteSearchState.status = dialog.querySelector('.wayward-search-dialog__status');

  siteSearchState.input?.addEventListener('input', () => {
    renderSiteSearchResults(siteSearchState.input?.value || '', siteSearchState.documents);
  });

  dialog.querySelectorAll('[data-search-close]').forEach((node) => {
    node.addEventListener('click', closeSiteSearchDialog);
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSiteSearchDialog();
  });

  return dialog;
}

async function openSiteSearchDialog() {
  const dialog = ensureSiteSearchDialog();
  dialog.hidden = false;
  document.body.classList.add('wayward-search-open');
  siteSearchState.input?.focus();

  siteSearchState.status.textContent = 'Loading search index…';
  siteSearchState.results.innerHTML = '';

  try {
    const documents = await loadSiteSearchIndex();
    siteSearchState.documents = documents;
    siteSearchState.status.textContent = 'Type to search the site and articles.';
    renderSiteSearchResults(siteSearchState.input?.value || '', documents);
  } catch {
    siteSearchState.status.textContent = 'Search is not available on this build yet.';
  }
}

function initSiteSearch() {
  const headerInner = document.querySelector('.wayward-header__inner');
  if (!headerInner) return;

  const themeToggle = headerInner.querySelector('.wayward-theme-toggle');
  themeToggle?.remove();

  let actions = headerInner.querySelector('.wayward-header__actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'wayward-header__actions';
    headerInner.appendChild(actions);
  }

  if (!actions.querySelector('.wayward-search-launch')) {
    const searchLaunch = document.createElement('button');
    searchLaunch.type = 'button';
    searchLaunch.className = 'wayward-search-launch';
    searchLaunch.setAttribute('aria-label', 'Search the site');
    searchLaunch.innerHTML = `
      <span class="wayward-search-launch__icon">${headerIcon('search')}</span>
      <span class="wayward-search-launch__label">Search</span>
      <span class="wayward-search-launch__hint" aria-hidden="true">/</span>
    `;
    actions.prepend(searchLaunch);

    searchLaunch.addEventListener('click', () => {
      openSiteSearchDialog();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented) return;
    if (event.key !== '/') return;
    if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select, [contenteditable]')) return;
    event.preventDefault();
    openSiteSearchDialog();
  });
}

function escapeHtml(text = '') {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatDisplayDate(value) {
  if (!value) return '';

  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

function computeReadingTime(text = '') {
  const words = (text.match(/\b[\p{L}\p{N}'-]+\b/gu) || []).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}

function getArticleUrl() {
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  return canonical || window.location.href;
}

function shareIcon(kind) {
  const icons = {
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7.5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Zm1.6.1 6.4 5.1 6.4-5.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10 7.75h7.25A1.75 1.75 0 0 1 19 9.5v8.75A1.75 1.75 0 0 1 17.25 20H8.5a1.75 1.75 0 0 1-1.75-1.75V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.75 15H6A1.75 1.75 0 0 1 4.25 13.25V4.5A1.75 1.75 0 0 1 6 2.75h8.75A1.75 1.75 0 0 1 16.5 4.5v.75" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    reddit: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19.2 13.5c0-.8-.7-1.5-1.5-1.5-.4 0-.8.2-1.1.5-1.1-.7-2.5-1.1-4.1-1.2l.9-3 2.6.6a1.3 1.3 0 1 0 .2-1 1.3 1.3 0 0 0-.1.2l-2.9-.7a.6.6 0 0 0-.7.4l-1 3.4c-1.6.1-3 .5-4.1 1.2a1.5 1.5 0 1 0-1 2.5v.1c0 2.2 2.6 4 5.9 4s5.9-1.8 5.9-4v-.1c.6-.2 1-.8 1-1.4Zm-8.3 1.8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm4.2 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5.1 2.5c.6.4 1.4.6 2.4.6s1.8-.2 2.4-.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.3 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM4.9 10.2h2.8V19H4.9zM10.1 10.2h2.7v1.2h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 1.9 3.5 4.5V19h-2.8v-4c0-.9 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V19h-2.8z" fill="currentColor"/></svg>',
  };

  return icons[kind] || '';
}

function enhanceRootArticleHeader() {
  if (!document.body.classList.contains('reading-body')) return;

  const title = document.getElementById('title-block-header');
  if (!title || title.dataset.enhanced === 'true') return;

  const heading = title.querySelector('.title, .chapter-title');
  if (!heading) return;

  const toc = document.getElementById('TOC');
  const hero = document.querySelector('.wayward-article-hero');
  const contentText = Array.from(document.body.children)
    .filter((child) => child !== title && child !== toc && child !== hero && !child.classList?.contains('wayward-header') && !child.classList?.contains('wayward-footer'))
    .map((child) => child.textContent || '')
    .join(' ');

  const subtitleEl = title.querySelector('.subtitle, .description');
  const dateEl = title.querySelector('.date');
  const authorEl = title.querySelector('.author');
  const titleText = heading.textContent?.trim() || document.title;
  const subtitle = subtitleEl?.textContent?.trim() || '';
  const displayDate = formatDisplayDate(
    dateEl?.textContent?.trim() ||
    document.querySelector('meta[name="dcterms.date"]')?.getAttribute('content') ||
    ''
  );
  const author = authorEl?.textContent?.trim() || '';
  const readingTime = computeReadingTime(contentText);
  const url = getArticleUrl();
  const metaBits = [];

  if (author) {
    metaBits.push(`<span class="post-meta-author">${escapeHtml(author)}</span>`);
  }
  if (displayDate) {
    metaBits.push(`<span class="post-meta-date">${escapeHtml(displayDate)}</span>`);
  }
  metaBits.push(`<span class="post-meta-reading-time">${escapeHtml(readingTime)}</span>`);

  title.classList.add('wayward-reading-head');
  title.innerHTML = `
    <div class="wayward-reading-head__meta-row">
      <div class="post-meta" aria-label="Article details">
        ${metaBits.map((bit, index) => `${index > 0 ? '<span class="post-meta-divider" aria-hidden="true">|</span>' : ''}${bit}`).join('')}
      </div>
      <div class="post-share" aria-label="Share article">
        <a class="post-share-button" href="mailto:?subject=${encodeURIComponent(titleText)}&body=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" aria-label="Share by email">
          <span class="post-share-icon">${shareIcon('email')}</span>
        </a>
        <a class="post-share-button" href="https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(titleText)}" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
          <span class="post-share-icon">${shareIcon('x')}</span>
        </a>
        <a class="post-share-button" href="https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(titleText)}" target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">
          <span class="post-share-icon">${shareIcon('reddit')}</span>
        </a>
        <a class="post-share-button" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <span class="post-share-icon">${shareIcon('linkedin')}</span>
        </a>
      </div>
    </div>
    <h1 class="title">${escapeHtml(titleText)}</h1>
    ${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ''}
  `;
  title.dataset.enhanced = 'true';
}

// ── Main init ─────────────────────────────────────────────────────────────────

async function init() {
  initSiteSearch();
  enhanceRootArticleHeader();

  if (
    document.body.classList.contains('tag-hash-story') ||
    document.querySelector('.story-section, .story-step, #essay-content')
  ) {
    await import('./essay/core.js');
  }

  // Pass the main content element to detect() so it can check text content
  // (used by math detection to find bare $ signs).
  const content = document.querySelector('.gh-content, .essay-content, .post-content, article');

  for (const entry of REGISTRY) {
    if (!entry.detect(content)) continue;

    await loadCDN(entry.cdn);

    if (entry.init) await entry.init();

    if (entry.selector) {
      const els = Array.from(document.querySelectorAll(entry.selector));
      for (const el of els) {
        const id = ensureId(el);
        let opts = {};
        try {
          if (el.dataset.options) opts = JSON.parse(el.dataset.options);
        } catch {
          console.warn('[loom] Invalid data-options JSON on', el);
        }
        const instance = entry.render ? await entry.render(el, opts) : null;
        instances.set(id, { entry, el, instance });
      }
    }
  }

  initPostProgress();
  addCopyButtons();
  initBackToTop();
  wireScrolly();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
