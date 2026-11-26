/*!
 * Pepper in the book — a study-buddy widget for the Wayward House books.
 *
 * Every book loads this one file (served from the hub, so improvements ship once):
 *   <script defer src="https://wayward.house/pepper/book.js"></script>
 *
 * The book is the first path segment (wayward.house/<book>/...). Questions go to /api/ask with
 * { question, book, page }, so Pepper answers from this book and prefers the chapter you're reading.
 * Test/override hooks (data-* on the script tag): data-book, data-page, data-api.
 */
(function () {
  'use strict';
  if (window.__whPepperBook) return;
  window.__whPepperBook = true;

  var BOOKS = ['computational-geography', 'mathematics', 'math-for-data-science-ai',
               'data-engineering', 'systems-thinking', 'gearlab'];
  var me = document.currentScript || document.querySelector('script[src*="pepper/book.js"]');
  var ds = (me && me.dataset) || {};

  var segs = location.pathname.replace(/^\/+/, '').split('/');
  var book = ds.book || segs.shift();
  if (BOOKS.indexOf(book) === -1) return;               // not inside a book: do nothing
  var page = ds.page || (segs.join('/') || 'index.html');
  if (/\/$/.test(page)) page += 'index.html';
  var api = ds.api || '/api/ask';
  var SLEEP_KEY = 'wh-pepper-asleep-until';

  var h1 = document.querySelector('h1.title, main h1, h1');
  var chapter = (h1 && h1.textContent.trim()) || document.title.split('|')[0].trim();

  // ── styles ──────────────────────────────────────────────────────────────────
  var css = [
    '.whp{position:fixed;right:1.1rem;bottom:4.75rem;z-index:9990;font:15px/1.5 "Barlow",system-ui,sans-serif;color:#0a0a0a}',
    '.whp *{box-sizing:border-box}',
    '.whp__btn{display:flex;align-items:center;gap:.5rem;background:#0a0a0a;color:#fff;border:0;border-radius:999px;',
    'padding:.35rem .95rem .35rem .35rem;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.28);font:600 .85rem/1 "Barlow",system-ui,sans-serif;letter-spacing:.02em}',
    '.whp__btn:hover{background:#e02020}',
    '.whp__btn img{width:34px;height:34px;border-radius:50%;object-fit:cover;display:block}',
    '.whp--asleep .whp__btn img{filter:grayscale(1) brightness(.8)}',
    '.whp--asleep .whp__btn::after{content:"zzz";font:600 .7rem/1 monospace;opacity:.7;margin-left:.15rem}',
    '.whp__panel{position:absolute;right:0;bottom:calc(100% + .6rem);width:min(24rem,calc(100vw - 2rem));max-height:min(34rem,72vh);',
    'display:flex;flex-direction:column;background:#fff;border:1px solid #d0d0c8;border-top:3px solid #e02020;border-radius:6px;box-shadow:0 12px 40px rgba(0,0,0,.25)}',
    '.whp__panel[hidden]{display:none}',
    '.whp__head{display:flex;justify-content:space-between;gap:.75rem;padding:.7rem .9rem .5rem;border-bottom:1px solid #e8e8e4}',
    '.whp__title{font:700 .95rem/1.2 "Barlow Condensed","Barlow",sans-serif;text-transform:uppercase;letter-spacing:.04em}',
    '.whp__where{font-size:.78rem;color:#5a5a56;margin-top:.15rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:17rem}',
    '.whp__x{background:none;border:0;font-size:1.4rem;line-height:1;cursor:pointer;color:#5a5a56;padding:0 .2rem}',
    '.whp__x:hover{color:#e02020}',
    '.whp__scope{display:flex;gap:.9rem;padding:.45rem .9rem;font-size:.8rem;color:#5a5a56;border-bottom:1px solid #e8e8e4}',
    '.whp__scope label{display:flex;gap:.3rem;align-items:center;cursor:pointer}',
    '.whp__body{padding:.8rem .9rem;overflow:auto;flex:1;min-height:5rem}',
    '.whp__hint{color:#5a5a56;font-size:.86rem;margin:0 0 .6rem}',
    '.whp__chips{display:flex;flex-wrap:wrap;gap:.4rem}',
    '.whp__chip{background:#f8f8f4;border:1px solid #d0d0c8;border-radius:999px;padding:.25rem .7rem;font:inherit;font-size:.8rem;cursor:pointer;color:#0a0a0a}',
    '.whp__chip:hover{border-color:#e02020;color:#e02020}',
    '.whp__q{font-weight:600;margin:0 0 .5rem}',
    '.whp__a{white-space:pre-wrap;margin:0}',
    '.whp__a.is-loading::after{content:" 🐾";animation:whp-b 1s infinite}',
    '@keyframes whp-b{50%{opacity:.2}}',
    '.whp__src{margin:.8rem 0 0;padding:.6rem 0 0;border-top:1px solid #e8e8e4;font-size:.8rem}',
    '.whp__src b{display:block;font:600 .68rem/1 monospace;letter-spacing:.12em;text-transform:uppercase;color:#9a9a94;margin-bottom:.35rem}',
    '.whp__src ul{list-style:none;margin:0;padding:0}.whp__src li{margin:0 0 .25rem}',
    '.whp__src a{color:#0a0a0a;text-decoration-color:#d0d0c8;text-underline-offset:3px}.whp__src a:hover{color:#e02020}',
    '.whp__tag{font:600 .62rem/1 monospace;letter-spacing:.08em;text-transform:uppercase;color:#e02020;margin-left:.4rem}',
    '.whp__sleep{text-align:center;padding:.5rem .2rem}',
    '.whp__sleep img{width:64px;height:64px;border-radius:50%;filter:grayscale(1);opacity:.85}',
    '.whp__sleep p{margin:.5rem 0 0;color:#5a5a56;font-size:.88rem}.whp__sleep strong{display:block;color:#0a0a0a;font-size:1rem}',
    '.whp__form{display:flex;gap:.5rem;padding:.6rem .9rem .8rem;border-top:1px solid #e8e8e4}',
    '.whp__in{flex:1;min-width:0;font:inherit;font-size:.9rem;padding:.45rem .6rem;border:1px solid #d0d0c8;border-radius:4px;resize:none;background:#fff;color:#0a0a0a}',
    '.whp__in:focus{outline:2px solid #e02020;outline-offset:-1px}',
    '.whp__go{background:#e02020;color:#fff;border:0;border-radius:4px;padding:0 .9rem;font:600 .85rem/1 "Barlow",sans-serif;cursor:pointer}',
    '.whp__go:disabled,.whp__in:disabled{opacity:.5;cursor:not-allowed}',
    '@media (prefers-reduced-motion:reduce){.whp__a.is-loading::after{animation:none}}',
    '@media print{.whp{display:none}}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ── DOM ─────────────────────────────────────────────────────────────────────
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  var root = el('div', 'whp');
  var btn = el('button', 'whp__btn'); btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'whp-panel');
  var avatar = el('img'); avatar.src = '/pepper.jpg'; avatar.alt = ''; avatar.width = 34; avatar.height = 34;
  btn.appendChild(avatar); btn.appendChild(document.createTextNode('Ask Pepper'));

  var panel = el('div', 'whp__panel'); panel.id = 'whp-panel'; panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Ask Pepper about this book');

  var head = el('div', 'whp__head'), headL = el('div');
  headL.appendChild(el('div', 'whp__title', 'Ask Pepper'));
  var where = el('div', 'whp__where', chapter); where.title = chapter; headL.appendChild(where);
  var close = el('button', 'whp__x', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Close');
  head.appendChild(headL); head.appendChild(close);

  var scope = el('div', 'whp__scope');
  function radio(val, label, checked) {
    var l = el('label'), i = el('input'); i.type = 'radio'; i.name = 'whp-scope'; i.value = val; i.checked = checked;
    l.appendChild(i); l.appendChild(document.createTextNode(label)); scope.appendChild(l); return i;
  }
  radio('chapter', 'This chapter first', true); radio('book', 'Whole book', false);

  var body = el('div', 'whp__body'); body.setAttribute('aria-live', 'polite');
  var form = el('form', 'whp__form');
  var input = el('textarea', 'whp__in'); input.rows = 2; input.maxLength = 500;
  input.placeholder = 'Ask about this chapter…'; input.setAttribute('aria-label', 'Your question');
  var go = el('button', 'whp__go', 'Ask'); go.type = 'submit';
  form.appendChild(input); form.appendChild(go);

  panel.appendChild(head); panel.appendChild(scope); panel.appendChild(body); panel.appendChild(form);
  root.appendChild(panel); root.appendChild(btn); document.body.appendChild(root);

  // ── states ──────────────────────────────────────────────────────────────────
  function showIntro() {
    body.textContent = '';
    body.appendChild(el('p', 'whp__hint', 'I\'ve read this book by smell. Ask me what something means, why it matters, or where it\'s covered.'));
    var chips = el('div', 'whp__chips');
    ['Summarise this chapter', 'What are the key terms here?', 'What should I know before this?'].forEach(function (t) {
      var c = el('button', 'whp__chip', t); c.type = 'button';
      c.addEventListener('click', function () { ask(t); });
      chips.appendChild(c);
    });
    body.appendChild(chips);
  }

  function wakeText(iso) {
    try { return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(new Date(iso)); }
    catch (e) { return 'tomorrow'; }
  }
  function showAsleep(wakeAt) {
    root.classList.add('whp--asleep');
    input.disabled = true; go.disabled = true;
    input.placeholder = 'Pepper is asleep…';
    body.textContent = '';
    var box = el('div', 'whp__sleep'), im = el('img'); im.src = '/pepper.jpg'; im.alt = '';
    box.appendChild(im);
    box.appendChild(el('p')).appendChild(el('strong', null, 'Pepper\'s asleep for today.'));
    box.appendChild(el('p', null, 'She\'s used up her question allowance for the day (the site runs on a free plan). She wakes at ' + wakeText(wakeAt) + '. The book is all still here in the meantime.'));
    body.appendChild(box);
    try { localStorage.setItem(SLEEP_KEY, wakeAt); } catch (e) {}
    var ms = Date.parse(wakeAt) - Date.now();
    if (ms > 0 && ms < 2147483647) setTimeout(wake, ms + 2000);
  }
  function wake() {
    root.classList.remove('whp--asleep');
    input.disabled = false; go.disabled = false; input.placeholder = 'Ask about this chapter…';
    try { localStorage.removeItem(SLEEP_KEY); } catch (e) {}
    showIntro();
  }
  function sleepingUntil() {
    try { var v = localStorage.getItem(SLEEP_KEY); if (v && Date.parse(v) > Date.now()) return v; localStorage.removeItem(SLEEP_KEY); } catch (e) {}
    return null;
  }

  // ── asking ──────────────────────────────────────────────────────────────────
  var busy = false;
  function ask(question) {
    question = (question || '').trim();
    if (busy || question.length < 3) return;
    var asleep = sleepingUntil(); if (asleep) { showAsleep(asleep); return; }
    busy = true; go.disabled = true; go.textContent = 'Sniffing…';
    body.textContent = '';
    body.appendChild(el('p', 'whp__q', question));
    var ans = el('p', 'whp__a is-loading'); body.appendChild(ans);
    var srcBox = null, text = '';
    var useChapter = (scope.querySelector('input:checked') || {}).value !== 'book';

    function finish() { busy = false; go.disabled = input.disabled; go.textContent = 'Ask'; ans.classList.remove('is-loading'); }
    function addSources(list) {
      if (!list || !list.length) return;
      srcBox = el('div', 'whp__src'); srcBox.appendChild(el('b', null, 'Where to read more'));
      var ul = el('ul');
      list.forEach(function (s) {
        var li = el('li'), a = el('a', null, [s.title, s.section].filter(Boolean).join(' › ') || s.url);
        a.href = s.url; li.appendChild(a);
        if (s.scope === 'chapter') li.appendChild(el('span', 'whp__tag', 'this chapter'));
        ul.appendChild(li);
      });
      srcBox.appendChild(ul); body.appendChild(srcBox);
    }

    fetch(api, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question, book: book, page: useChapter ? page : undefined })
    }).then(function (res) {
      var ct = res.headers.get('content-type') || '';
      if (ct.indexOf('application/json') !== -1) {
        return res.json().then(function (d) {
          if (d.asleep) { finish(); showAsleep(d.wakeAt); return; }
          ans.textContent = d.answer || d.error || 'Something went wrong. Try again.';
          finish();
        });
      }
      if (!res.ok || !res.body) { ans.textContent = 'Something went wrong. Try again.'; finish(); return; }
      var reader = res.body.getReader(), dec = new TextDecoder(), buf = '';
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) { finish(); return; }
          buf += dec.decode(r.value, { stream: true });
          var lines = buf.split('\n'); buf = lines.pop();
          lines.forEach(function (line) {
            if (line.indexOf('data: ') !== 0) return;
            var data = line.slice(6); if (data === '[DONE]') return;
            try {
              var p = JSON.parse(data);
              if (p.sources) { addSources(p.sources); return; }
              if (p.error) { text += '\n\n(' + p.error + ')'; ans.textContent = text; return; }
              var tok = p.response != null ? p.response : (p.choices && p.choices[0] && p.choices[0].delta && p.choices[0].delta.content) || '';
              text += tok; ans.textContent = text;
            } catch (e) { /* ignore partial frames */ }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function () {
      ans.textContent = 'Pepper\'s nose twitched but nothing came through. Try again.'; finish();
    });
  }

  // ── wiring ──────────────────────────────────────────────────────────────────
  function open(prefill) {
    panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
    var asleep = sleepingUntil();
    if (asleep) showAsleep(asleep); else if (!body.childNodes.length) showIntro();
    if (prefill) input.value = prefill;
    if (!input.disabled) input.focus();
  }
  function shut() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }

  // Keep a text selection alive when the button is pressed, so "select a term, click Ask Pepper" works.
  btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
  btn.addEventListener('click', function () {
    if (!panel.hidden) { shut(); return; }
    var sel = (window.getSelection && String(window.getSelection())).trim();
    open(sel && sel.length <= 300 ? 'Explain: "' + sel.replace(/\s+/g, ' ') + '"' : '');
  });
  close.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) shut(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); var q = input.value; input.value = ''; ask(q); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });

  var asleepNow = sleepingUntil(); if (asleepNow) { root.classList.add('whp--asleep'); }

  window.WHPepper = { open: open, ask: function (q) { open(); ask(q); }, book: book, page: page };
})();
