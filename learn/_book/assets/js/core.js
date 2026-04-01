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

function updateThemeMeta(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore storage failures in locked-down contexts.
  }
}

function injectWaywardChrome() {
  if (document.querySelector('.wayward-header')) return;

  const path = currentPath();
  const body = document.body;

  body.classList.add('wayward-shell');
  if (isHomeLikePath(path)) body.classList.add('page-home');
  if (isReadingPage()) body.classList.add('page-reading');
  if (path.startsWith('/learn/')) body.classList.add('page-learn');

  const header = document.createElement('header');
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
      <button class="wayward-theme-toggle" type="button" aria-label="Toggle theme">
        <span aria-hidden="true">${document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  `;

  header.querySelectorAll('[data-nav]').forEach((link) => {
    const target = link.getAttribute('data-nav');
    if (!target) return;
    if (path === target || path.startsWith(target)) {
      link.classList.add('is-active');
    }
  });

  const toggle = header.querySelector('.wayward-theme-toggle');
  toggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    updateThemeMeta(nextTheme);
    const label = nextTheme === 'dark' ? 'Light' : 'Dark';
    const span = toggle.querySelector('span');
    if (span) span.textContent = label;
  });

  const footer = document.querySelector('footer.wayward-footer');

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

      layout.appendChild(aside);
      layout.appendChild(content);
      main.appendChild(layout);
    }
  }

  body.prepend(main);
  body.prepend(header);

  if (!footer) {
    const runtimeFooter = document.createElement('footer');
    runtimeFooter.className = 'wayward-footer';
    runtimeFooter.innerHTML = `
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

    const firstScript = body.querySelector('script');
    if (firstScript) {
      body.insertBefore(runtimeFooter, firstScript);
    } else {
      body.appendChild(runtimeFooter);
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
