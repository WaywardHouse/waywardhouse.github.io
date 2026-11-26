/**
 * Shared helpers for Pepper (ask.js, book-ask.js, ingest.js) and for scripts/ingest-books.mjs.
 * Pure ES module: no Worker-only imports, so it can also run in Node 20+ and in tests.
 */

export const SLEEP_MESSAGE =
  "Pepper's asleep. She's answered all the questions her daily allowance covers (this site runs on a free plan, " +
  "so she has a fixed number of questions a day). She'll be back after the allowance resets.";

export const DEFAULT_DAILY_CAP = 60;

// ── Paths ─────────────────────────────────────────────────────────────────────

/** "/foundations/x.html?y#z" -> "foundations/x.html"; "a/" -> "a/index.html"; "" -> "index.html". */
export function normalizePage(p) {
  let s = String(p ?? '').split('#')[0].split('?')[0].replace(/^\/+/, '');
  if (s === '' || s.endsWith('/')) s += 'index.html';
  return s;
}

export async function sha1hex(str, n = 12) {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, n);
}

/** Vectorize string metadata indexes only look at the first 64 bytes, so filter on a short hash of the page path. */
export const pageKey = (page) => sha1hex(normalizePage(page), 12);

// ── Sleep state ───────────────────────────────────────────────────────────────

/** Next 00:00 UTC, which is when the Workers AI free allocation resets. */
export function nextWake(now = new Date()) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)).toISOString();
}

/** True when an error from Workers AI / Vectorize means "out of free allocation" rather than a real fault. */
export function isQuotaError(err) {
  const m = String(err?.message ?? err ?? '');
  return /4006|daily free allocation|used up|neurons|quota|rate.?limit|too many requests|\b429\b/i.test(m);
}

let asleepUntil = 0; // per-isolate memo so a sleeping Pepper stops spending calls immediately
export function markAsleep() { asleepUntil = Date.parse(nextWake()); }

export function asleepResponse(cors = {}) {
  const wakeAt = nextWake();
  const retry = Math.max(60, Math.round((Date.parse(wakeAt) - Date.now()) / 1000));
  return Response.json(
    { asleep: true, wakeAt, message: SLEEP_MESSAGE },
    { status: 503, headers: { ...cors, 'Retry-After': String(retry) } },
  );
}

let usageTableReady = false;

/**
 * Spend one question from today's budget (env.PEPPER_DAILY_CAP, default 60). Atomic in D1.
 * Returns { ok:false } when Pepper should be asleep. Fails open if D1 is unavailable.
 */
export async function takeTicket(env) {
  if (Date.now() < asleepUntil) return { ok: false };
  if (!env.DB) return { ok: true };
  const cap = Number.parseInt(env.PEPPER_DAILY_CAP ?? DEFAULT_DAILY_CAP, 10);
  if (!(cap > 0)) return { ok: false };
  try {
    if (!usageTableReady) {
      await env.DB.exec('CREATE TABLE IF NOT EXISTS pepper_usage (day TEXT PRIMARY KEY, n INTEGER NOT NULL)');
      usageTableReady = true;
    }
    const day = new Date().toISOString().slice(0, 10);
    const row = await env.DB
      .prepare('INSERT INTO pepper_usage (day, n) VALUES (?1, 1) ON CONFLICT(day) DO UPDATE SET n = n + 1 WHERE n < ?2 RETURNING n')
      .bind(day, cap)
      .first();
    if (!row) { markAsleep(); return { ok: false }; }
    return { ok: true, used: row.n, cap };
  } catch (err) {
    console.error('takeTicket failed (failing open):', err);
    return { ok: true };
  }
}

// ── Streaming ─────────────────────────────────────────────────────────────────

/** Pipe a Workers AI SSE stream to the client, then append a final `sources` event. */
export function streamWithSources(aiStream, sources, cors = {}) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const enc = new TextEncoder();
  (async () => {
    const reader = aiStream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writer.write(value);
      }
      await writer.write(enc.encode(`\ndata: ${JSON.stringify({ sources })}\n\n`));
    } catch (err) {
      console.error('stream error:', err);
      if (isQuotaError(err)) markAsleep();
      try { await writer.write(enc.encode(`\ndata: ${JSON.stringify({ error: 'The answer was cut short.' })}\n\n`)); } catch {}
    } finally {
      try { await writer.close(); } catch {}
    }
  })();
  return new Response(readable, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', ...cors },
  });
}
