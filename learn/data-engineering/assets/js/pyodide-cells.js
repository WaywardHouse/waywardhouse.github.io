/**
 * pyodide-cells.js
 * Self-contained Pyodide adapter for Systems Thinking for Modellers.
 *
 * Authoring convention in .qmd files:
 *
 *   ::: {.pyodide-cell}
 *   ```python
 *   import numpy as np
 *   print(np.exp(-1.5))
 *   ```
 *   :::
 *
 * Matplotlib output is captured automatically — plt.show() emits
 * an inline PNG via the Agg backend.
 *
 * numpy and matplotlib are pre-loaded; additional packages can be
 * installed inside cells with micropip.install() or pyodide.loadPackage().
 */

(function () {
  const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs';

  // Matplotlib setup injected before every cell run
  const MPL_SETUP = `
import sys, io, base64
_mpl_available = False
try:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as _plt
    _mpl_available = True
except ImportError:
    pass

def _capture_show():
    if not _mpl_available:
        return None
    buf = io.BytesIO()
    _plt.savefig(buf, format='png', bbox_inches='tight', dpi=120)
    _plt.close('all')
    buf.seek(0)
    return base64.b64encode(buf.read()).decode()

if _mpl_available:
    _plt.show = lambda *a, **k: None  # suppress default show
`;

  let pyodideReady = null;   // Promise, resolved once Pyodide is loaded
  let pyodideInst  = null;

  function loadPyodide() {
    if (pyodideReady) return pyodideReady;
    pyodideReady = (async () => {
      const { loadPyodide } = await import(PYODIDE_CDN);
      const py = await loadPyodide();
      await py.loadPackage(['numpy', 'matplotlib']);
      await py.runPythonAsync(MPL_SETUP);
      pyodideInst = py;
      return py;
    })();
    return pyodideReady;
  }

  function buildCell(el) {
    const codeEl = el.querySelector('code');
    if (!codeEl) return;

    const source = codeEl.textContent;

    el.innerHTML = `
      <div class="pyodide-cell__header">
        <span class="pyodide-cell__label">Python — editable</span>
        <button class="pyodide-cell__run" type="button">&#9654; Run</button>
      </div>
      <textarea class="pyodide-cell__editor" spellcheck="false"
        autocorrect="off" autocapitalize="off"></textarea>
      <div class="pyodide-cell__output" hidden></div>
    `;

    const editor  = el.querySelector('.pyodide-cell__editor');
    const runBtn  = el.querySelector('.pyodide-cell__run');
    const output  = el.querySelector('.pyodide-cell__output');

    editor.value = source;
    // Auto-height
    function resize() {
      editor.style.height = 'auto';
      editor.style.height = editor.scrollHeight + 'px';
    }
    resize();
    editor.addEventListener('input', resize);

    // Tab → spaces
    editor.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const s = editor.selectionStart;
      editor.value = editor.value.slice(0, s) + '    ' + editor.value.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = s + 4;
    });

    // Shift+Enter to run
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        runBtn.click();
      }
    });

    runBtn.addEventListener('click', async () => {
      runBtn.disabled = true;
      runBtn.textContent = '⏳ Loading Python…';
      output.hidden = true;
      output.className = 'pyodide-cell__output';
      output.innerHTML = '';

      try {
        const py = await loadPyodide();

        runBtn.textContent = '⏳ Running…';

        // Use Python-side StringIO for reliable stdout/stderr capture
        py.globals.set('_user_code', editor.value);
        const result = await py.runPythonAsync(`
import io as _io, sys as _sys, traceback as _tb
_stdout_buf = _io.StringIO()
_stderr_buf = _io.StringIO()
_old_stdout = _sys.stdout
_old_stderr = _sys.stderr
_sys.stdout = _stdout_buf
_sys.stderr = _stderr_buf
_run_error = None
try:
    exec(_user_code, {})
except Exception as _e:
    _run_error = _tb.format_exc()
finally:
    _sys.stdout = _old_stdout
    _sys.stderr = _old_stderr
(_stdout_buf.getvalue(), _stderr_buf.getvalue(), _run_error)
`);
        const stdout = result.get(0) || '';
        const stderr = result.get(1) || '';
        const runError = result.get(2);
        result.destroy();

        // Capture matplotlib figure if any axes were drawn
        const imgB64 = await py.runPythonAsync('_capture_show()');

        let html = '';
        const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        if (stdout.trim()) {
          html += `<pre class="pyodide-cell__text">${escape(stdout)}</pre>`;
        }
        if (stderr.trim()) {
          html += `<pre class="pyodide-cell__text pyodide-cell__text--stderr">${escape(stderr)}</pre>`;
        }
        if (runError) {
          output.classList.add('pyodide-cell__output--error');
          html += `<pre class="pyodide-cell__text">${escape(runError)}</pre>`;
        }
        if (imgB64 && imgB64 !== 'None') {
          html += `<img src="data:image/png;base64,${imgB64}" style="max-width:100%;display:block;margin-top:.5rem">`;
        }
        if (!html) {
          html = '<span class="pyodide-cell__empty">✓ Ran (no output)</span>';
        }
        output.innerHTML = html;

      } catch (err) {
        output.classList.add('pyodide-cell__output--error');
        output.textContent = String(err);
      } finally {
        output.hidden = false;
        runBtn.disabled = false;
        runBtn.textContent = '▶ Run';
      }
    });
  }

  function init() {
    document.querySelectorAll('.pyodide-cell').forEach(buildCell);
    // Start loading Pyodide in the background as soon as any cell exists
    if (document.querySelector('.pyodide-cell')) {
      loadPyodide().catch(() => {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
