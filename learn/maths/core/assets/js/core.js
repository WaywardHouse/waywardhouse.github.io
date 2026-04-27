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

function initKeyboardNav() {
  const steps = Array.from(document.querySelectorAll('.story-step'));
  if (steps.length === 0) return;

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, select, [contenteditable]')) return;

    const active = document.querySelector('.story-step[data-active]');
    const idx = active ? steps.indexOf(active) : -1;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      steps[Math.min(idx + 1, steps.length - 1)]
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      steps[Math.max(idx - 1, 0)]
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      e.preventDefault();
    }
  });
}

let storyInited = false;

async function initStorytelling() {
  if (storyInited) return;
  const sections = Array.from(document.querySelectorAll('.story-section'));
  if (sections.length === 0) return;

  sections.forEach((section, sectionIdx) => {
    const graphic = section.querySelector('.story-graphic');
    const stepEls = Array.from(section.querySelectorAll('.story-step'));
    if (!graphic || stepEls.length === 0) return;

    if (!section.id) section.id = `story-${sectionIdx + 1}`;
    graphic.setAttribute('aria-live', 'polite');

    function activateStep(stepEl, index = 0, direction = 'down') {
      stepEls.forEach((step) => {
        step.removeAttribute('data-active');
        step.setAttribute('aria-hidden', 'true');
      });

      stepEl.setAttribute('data-active', '');
      stepEl.removeAttribute('aria-hidden');

      graphic.dispatchEvent(new CustomEvent('story:step', {
        bubbles: true,
        detail: {
          index,
          step: stepEl.dataset.step ?? String(index),
          direction,
          element: stepEl,
        },
      }));
    }

    activateStep(stepEls[0], 0, 'down');

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const stepEl = visible.target;
      const index = stepEls.indexOf(stepEl);
      activateStep(stepEl, index, 'down');
    }, {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: [0.15, 0.4, 0.7],
    });

    stepEls.forEach((stepEl, index) => {
      if (!stepEl.id) stepEl.id = `${section.id}-step-${index + 1}`;
      observer.observe(stepEl);
    });
  });

  initKeyboardNav();
  storyInited = true;
}

// ── Reading progress bar ──────────────────────────────────────────────────────
// Adds a fixed 2px progress bar at the top of the viewport on post pages.
// Essay pages already get this from essay/progress.js; skipped here to avoid
// double-mounting.

function normalizePath(pathname) {
  if (!pathname) return '/';
  const cleaned = pathname
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '/');
  return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
}

function currentPath() {
  return normalizePath(window.location.pathname);
}

function isHomeLikePath(pathname) {
  return pathname === '/' || pathname === '/learn/';
}

function isReadingPage() {
  const path = currentPath();
  if (isHomeLikePath(path)) return false;
  if (document.getElementById('essay-content')) return false;
  if (document.body.classList.contains('reading-body')) return true;
  if (document.querySelector('#TOC') && document.querySelector('h2, h3')) return true;
  return false;
}

function escapeHtml(text = '') {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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

function extractSidebarSectionLinks(sidebar, activeLink) {
  const section = activeLink?.closest('ul.sidebar-section');
  if (!section) return [];

  return Array.from(section.querySelectorAll('a.sidebar-item-text.sidebar-link[href]'))
    .filter((link) => !link.hasAttribute('data-bs-toggle'));
}

function getMathsReadingNavState(titleText = '') {
  const sidebar = document.getElementById('quarto-sidebar');
  if (!sidebar) return null;

  const active = sidebar.querySelector('a.sidebar-item-text.sidebar-link.active[href]');
  if (!active) return null;

  const sectionLinks = extractSidebarSectionLinks(sidebar, active);
  if (sectionLinks.length === 0) return null;

  const currentIndex = sectionLinks.indexOf(active);
  if (currentIndex === -1) return null;

  const breadcrumbs = Array.from(
    document.querySelectorAll('#title-block-header .quarto-page-breadcrumbs .breadcrumb-item a')
  );
  const sectionCrumb = breadcrumbs[0] || sectionLinks[0];
  const allChapters = sidebar.querySelector('.sidebar-title a');

  return {
    allChaptersHref: allChapters?.getAttribute('href') || '/',
    chapterCount: sectionLinks.length,
    chapterStart: sectionLinks[0],
    currentIndex,
    currentTitle: titleText || active.textContent?.trim() || document.title,
    next: currentIndex < sectionLinks.length - 1 ? sectionLinks[currentIndex + 1] : null,
    previous: currentIndex > 0 ? sectionLinks[currentIndex - 1] : null,
    sectionTitle: sectionCrumb?.textContent?.replace(/\s+/g, ' ').trim() || 'Mathematics',
  };
}

function wayfindingHref(link, fallback = '/') {
  if (!link) return fallback;
  return link.getAttribute('href') || fallback;
}

function wayfindingLabel(link, fallback = '') {
  if (!link) return fallback;
  return link.textContent?.replace(/\s+/g, ' ').trim() || fallback;
}

function renderMathsTopWayfinding(titleText = '') {
  const state = getMathsReadingNavState(titleText);
  if (!state) return '';

  return `
    <div class="wayward-book-wayfinding">
      <nav class="wayward-book-breadcrumbs" aria-label="Breadcrumb">
        <a href="${escapeHtml(state.allChaptersHref)}">Mathematics</a>
        <span aria-hidden="true">/</span>
        <a href="${escapeHtml(wayfindingHref(state.chapterStart, state.allChaptersHref))}">${escapeHtml(state.sectionTitle)}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${escapeHtml(state.currentTitle)}</span>
      </nav>
      <div class="wayward-book-wayfinding__actions">
        <a class="wayward-book-wayfinding__action" href="${escapeHtml(wayfindingHref(state.chapterStart, state.allChaptersHref))}">Back to start of chapter</a>
        <a class="wayward-book-wayfinding__action" href="${escapeHtml(state.allChaptersHref)}">All chapters</a>
        ${document.querySelector('#TOC') ? '<a class="wayward-book-wayfinding__action" href="#TOC">Jump to contents</a>' : ''}
      </div>
    </div>
  `;
}

function renderMathsPagerCard(kind, link, fallbackHref, fallbackTitle, description) {
  return `
    <a class="wayward-book-pager-card${link ? '' : ' wayward-book-pager-card--muted'}" href="${escapeHtml(wayfindingHref(link, fallbackHref))}">
      <span class="wayward-book-pager-card__eyebrow">${escapeHtml(kind)}</span>
      <strong>${escapeHtml(wayfindingLabel(link, fallbackTitle))}</strong>
      <p>${escapeHtml(description)}</p>
    </a>
  `;
}

function renderMathsBottomWayfinding(titleText = '') {
  const state = getMathsReadingNavState(titleText);
  if (!state) return null;

  const pager = document.createElement('nav');
  pager.className = 'wayward-book-reading-pager';
  pager.setAttribute('aria-label', 'Chapter navigation');
  pager.innerHTML = `
    ${renderMathsPagerCard(
      'Previous',
      state.previous,
      wayfindingHref(state.chapterStart, state.allChaptersHref),
      'Back to start of chapter',
      state.previous ? 'Move to the previous page in this chapter path.' : 'Return to the chapter opener for this volume path.'
    )}
    <div class="wayward-book-pager-card wayward-book-pager-card--current" aria-current="page">
      <span class="wayward-book-pager-card__eyebrow">Where you are</span>
      <strong>${escapeHtml(state.currentTitle)}</strong>
      <p>${escapeHtml(`${state.sectionTitle} · ${state.currentIndex + 1} of ${state.chapterCount}`)}</p>
    </div>
    ${renderMathsPagerCard(
      'Next',
      state.next,
      state.allChaptersHref,
      'Chapter path complete',
      state.next ? 'Move to the next page in this chapter path.' : 'You have reached the end of this chapter path.'
    )}
  `;

  return pager;
}

function getBookmarkStorage() {
  try {
    const raw = localStorage.getItem('wayward-bookmarks');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setBookmarkStorage(items) {
  try {
    localStorage.setItem('wayward-bookmarks', JSON.stringify(items));
  } catch {
    // Ignore storage failures.
  }
}

function bookmarkIcon(saved) {
  const stroke = saved ? 'currentColor' : 'none';
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 4.75h10a1 1 0 0 1 1 1v13.5l-6-3.6-6 3.6V5.75a1 1 0 0 1 1-1Z" fill="${stroke}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    </svg>
  `;
}

function shareIcon(kind) {
  const icons = {
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7.5a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Zm1.6.1 6.4 5.1 6.4-5.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10 7.75h7.25A1.75 1.75 0 0 1 19 9.5v8.75A1.75 1.75 0 0 1 17.25 20H8.5a1.75 1.75 0 0 1-1.75-1.75V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.75 15H6A1.75 1.75 0 0 1 4.25 13.25V4.5A1.75 1.75 0 0 1 6 2.75h8.75A1.75 1.75 0 0 1 16.5 4.5v.75" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.5 20v-7h2.4l.4-3h-2.8V8.2c0-.9.3-1.5 1.6-1.5H16.5V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V10H8v3h2.4v7h3.1Z" fill="currentColor"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.3 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM4.9 10.2h2.8V19H4.9zM10.1 10.2h2.7v1.2h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 1.9 3.5 4.5V19h-2.8v-4c0-.9 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V19h-2.8z" fill="currentColor"/></svg>',
  };

  return icons[kind] || '';
}

function enhanceReadingTitleBlock(main, title, toc) {
  if (!title || title.dataset.enhanced === 'true') return;

  const contentText = Array.from(main.children)
    .filter((child) => child !== title && child !== toc)
    .map((child) => child.textContent || '')
    .join(' ');

  const heading = title.querySelector('.title, .chapter-title');
  if (!heading) return;

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
  const articleKey = slugify(url || titleText);
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
    ${renderMathsTopWayfinding(titleText)}
    <div class="wayward-reading-head__meta-row">
      <div class="post-meta" aria-label="Article details">
        ${metaBits.map((bit, index) => `${index > 0 ? '<span class="post-meta-divider" aria-hidden="true">|</span>' : ''}${bit}`).join('')}
      </div>
      <div class="post-share" aria-label="Bookmark and share article">
        <button class="post-bookmark-button" type="button" data-article-key="${escapeHtml(articleKey)}" data-article-url="${escapeHtml(url)}" data-article-title="${escapeHtml(titleText)}" aria-pressed="false" aria-label="Save article">
          <span class="post-share-icon">${bookmarkIcon(false)}</span>
          <span class="post-share-text">Save</span>
        </button>
        <a class="post-share-button" href="mailto:?subject=${encodeURIComponent(titleText)}&body=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" aria-label="Share by email">
          <span class="post-share-icon">${shareIcon('email')}</span>
          <span class="post-share-text">Email</span>
        </a>
        <button class="post-share-button post-share-button--copy" type="button" data-copy-url="${escapeHtml(url)}" aria-label="Copy link">
          <span class="post-share-icon">${shareIcon('copy')}</span>
          <span class="post-share-text">Copy link</span>
        </button>
        <a class="post-share-button" href="https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(titleText)}" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
          <span class="post-share-icon">${shareIcon('x')}</span>
          <span class="post-share-text">X</span>
        </a>
        <a class="post-share-button" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <span class="post-share-icon">${shareIcon('facebook')}</span>
          <span class="post-share-text">Facebook</span>
        </a>
        <a class="post-share-button" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <span class="post-share-icon">${shareIcon('linkedin')}</span>
          <span class="post-share-text">LinkedIn</span>
        </a>
      </div>
    </div>
    <h1 class="title"><span class="chapter-title">${escapeHtml(titleText)}</span></h1>
    ${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ''}
  `;
  title.dataset.enhanced = 'true';

  const bookmarkButton = title.querySelector('.post-bookmark-button');
  const copyButton = title.querySelector('.post-share-button--copy');

  function syncBookmarkButton() {
    if (!bookmarkButton) return;
    const items = getBookmarkStorage();
    const saved = items.some((item) => item.key === articleKey);
    bookmarkButton.setAttribute('aria-pressed', saved ? 'true' : 'false');
    bookmarkButton.querySelector('.post-share-icon').innerHTML = bookmarkIcon(saved);
    bookmarkButton.querySelector('.post-share-text').textContent = saved ? 'Saved' : 'Save';
    bookmarkButton.setAttribute('aria-label', saved ? 'Remove saved article' : 'Save article');
  }

  bookmarkButton?.addEventListener('click', () => {
    const items = getBookmarkStorage();
    const index = items.findIndex((item) => item.key === articleKey);
    if (index >= 0) {
      items.splice(index, 1);
    } else {
      items.unshift({
        key: articleKey,
        title: titleText,
        url,
        savedAt: new Date().toISOString(),
      });
    }
    setBookmarkStorage(items.slice(0, 100));
    syncBookmarkButton();
  });

  copyButton?.addEventListener('click', async () => {
    const nextLabel = copyButton.querySelector('.post-share-text');
    try {
      await navigator.clipboard.writeText(url);
      if (nextLabel) nextLabel.textContent = 'Copied';
      window.setTimeout(() => {
        if (nextLabel) nextLabel.textContent = 'Copy link';
      }, 1800);
    } catch {
      if (nextLabel) nextLabel.textContent = 'Unavailable';
      window.setTimeout(() => {
        if (nextLabel) nextLabel.textContent = 'Copy link';
      }, 1800);
    }
  });

  syncBookmarkButton();
}

function injectWaywardChrome() {
  const path = currentPath();
  const body = document.body;
  // Skip when WH book theme extension is active — it provides its own
  // header/footer/search and we must not inject a second set.
  if (document.querySelector('.wh-bk-hdr')) return;
  // Skip on Quarto book/website pages that already have a sidebar.
  if (body.classList.contains('nav-sidebar') || document.getElementById('quarto-sidebar')) {
    if (isHomeLikePath(path)) body.classList.add('page-home');
    if (path.startsWith('/learn/')) body.classList.add('page-learn');
    return;
  }

  const existingHeader = document.querySelector('.wayward-header');
  const existingFooter = document.querySelector('.wayward-footer');
  const existingMain = document.querySelector('.wayward-main');

  body.classList.add('wayward-shell');
  if (isHomeLikePath(path)) body.classList.add('page-home');
  if (isReadingPage()) body.classList.add('page-reading');
  if (path.startsWith('/learn/')) body.classList.add('page-learn');

  const header = existingHeader || document.createElement('header');
  if (!existingHeader) {
    header.className = 'wayward-header';
    header.innerHTML = `
      <div class="wayward-header__inner">
        <a class="wayward-brand" href="/" aria-label="Wayward House home">
          <span class="wayward-brand__mark">WaywardHouse</span>
          <span class="wayward-brand__dot" aria-hidden="true">.</span>
        </a>
        <nav class="wayward-nav" aria-label="Primary">
          <a href="/articles/" data-nav="/articles/">Articles</a>
          <a href="/learn/" data-nav="/learn/">Learn</a>
          <a href="/pages/about.html" data-nav="/pages/about/">About</a>
        </nav>
      </div>
    `;
  }

  const headerBrand = header.querySelector('.wayward-brand');
  if (headerBrand) headerBrand.setAttribute('href', '/');

  const headerLinks = [
    ['/articles/', '/articles/'],
    ['/learn/', '/learn/'],
    ['/pages/about.html', '/about.html'],
  ];
  header.querySelectorAll('.wayward-nav a').forEach((link, index) => {
    const [href, nav] = headerLinks[index] || [];
    if (href) link.setAttribute('href', href);
    if (nav) link.setAttribute('data-nav', nav);
  });

  header.querySelectorAll('[data-nav]').forEach((link) => {
    link.classList.remove('is-active');
    const target = link.getAttribute('data-nav');
    if (!target) return;
    if (path === target || path.startsWith(target)) {
      link.classList.add('is-active');
    }
  });

  header.querySelector('.wayward-theme-toggle')?.remove();

  if (existingHeader && existingFooter && existingMain) return;

  const footer = existingFooter || document.createElement('footer');
  if (!existingFooter) {
    footer.className = 'wayward-footer';
    footer.innerHTML = `
      <div class="wayward-footer__inner">
        <div class="wayward-footer__brand">
          <div class="wayward-footer__logo">WaywardHouse <span>.</span></div>
          <p>Understanding how place, economy, and environment interact through analysis, modelling, and open tools.</p>
        </div>
        <div class="wayward-footer__group">
          <h2>Reading</h2>
          <a href="/articles/">Articles</a>
          <a href="/learn/">Learn</a>
          <a href="/topics/">Topics</a>
        </div>
        <div class="wayward-footer__group">
          <h2>Site</h2>
          <a href="/">Home</a>
          <a href="/pages/about.html">About</a>
          <a href="/pages/contact.html">Contact</a>
        </div>
      </div>
    `;
  }

  const footerLinkMap = new Map([
    ['Articles', '/articles/'],
    ['Learn', '/learn/'],
    ['Archive', '/archive.html'],
    ['Start Here', '/start-here.html'],
    ['About', '/about.html'],
    ['Contact', '/contact.html'],
    ['All Topics', '/topics/'],
    ['Privacy Policy', '/privacy.html'],
    ['Terms of Use', '/terms.html'],
  ]);
  footer.querySelectorAll('.wayward-footer a').forEach((link) => {
    const target = footerLinkMap.get((link.textContent || '').trim());
    if (target) link.setAttribute('href', target);
  });

  const contentNodes = Array.from(body.children).filter((node) => {
    if (node === header || node === footer) return false;
    if (node.tagName === 'SCRIPT') return false;
    if (node.classList.contains('wayward-header')) return false;
    if (node.classList.contains('wayward-footer')) return false;
    return true;
  });

  const main = document.createElement('main');
  main.className = 'wayward-main';
  contentNodes.forEach((node) => main.appendChild(node));

  if (body.classList.contains('page-reading')) {
    const toc = main.querySelector('#TOC');
    const title = main.querySelector('#title-block-header');

    enhanceReadingTitleBlock(main, title, toc);

    if (toc && title) {
      const layout = document.createElement('div');
      layout.className = 'wayward-reading-layout';

      const aside = document.createElement('aside');
      aside.className = 'wayward-reading-toc';
      aside.appendChild(toc);

      const content = document.createElement('article');
      content.className = 'wayward-reading-content';
      Array.from(main.children).forEach((child) => {
        if (child !== toc) content.appendChild(child);
      });

      const readingPager = renderMathsBottomWayfinding(
        title.querySelector('.chapter-title')?.textContent?.trim() || document.title
      );
      if (readingPager) content.appendChild(readingPager);

      layout.appendChild(aside);
      layout.appendChild(content);
      main.appendChild(layout);
    }
  }

  body.prepend(main);
  if (!existingHeader) body.prepend(header);

  if (!existingFooter) {
    const firstScript = body.querySelector('script');
    if (firstScript) {
      body.insertBefore(footer, firstScript);
    } else {
      body.appendChild(footer);
    }
  }
}

function initPostProgress() {
  if (document.getElementById('essay-content')) return; // essay handles it
  if (!isReadingPage()) return;
  if (document.querySelector('.essay-progress-bar')) return;

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

function initQuartoBookLayout() {
  const sidebar = document.getElementById('quarto-sidebar');
  if (!sidebar) return;

  const body = document.body;
  const storageKey = 'wayward-maths-sidebar';
  const media = window.matchMedia('(min-width: 1200px)');
  const glass = document.getElementById('quarto-sidebar-glass');
  const toggles = Array.from(document.querySelectorAll('[data-bs-target=".quarto-sidebar-collapse-item"]'));

  function setDesktopState(open) {
    body.classList.toggle('book-sidebar-collapsed', !open);
    body.classList.toggle('book-sidebar-open', open);
    try {
      localStorage.setItem(storageKey, open ? 'open' : 'collapsed');
    } catch {
      // Ignore storage failures.
    }
  }

  function applyDesktopDefault() {
    if (!media.matches) {
      body.classList.remove('book-sidebar-collapsed', 'book-sidebar-open');
      return;
    }

    let stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch {
      // Ignore storage failures.
    }

    setDesktopState(stored === 'collapsed' ? false : true);
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      if (!media.matches) return;
      event.preventDefault();
      event.stopPropagation();
      setDesktopState(body.classList.contains('book-sidebar-collapsed'));
    });
  });

  glass?.addEventListener('click', (event) => {
    if (!media.matches) return;
    event.preventDefault();
    setDesktopState(false);
  });

  media.addEventListener('change', applyDesktopDefault);
  applyDesktopDefault();

  // Quarto points the sidebar title back to the book root by default.
  // In the maths subsite we want the visible "home" affordances to return
  // to the main Wayward House homepage instead.
  const siteHomeHref = '/';
  sidebar.querySelector('.sidebar-title a')?.setAttribute('href', siteHomeHref);
  sidebar.querySelector('.sidebar-item a.sidebar-link')?.setAttribute('href', siteHomeHref);
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

// ── Main init ─────────────────────────────────────────────────────────────────

async function init() {
  injectWaywardChrome();
  initQuartoBookLayout();

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
  wireScrolly();
  await initStorytelling();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
