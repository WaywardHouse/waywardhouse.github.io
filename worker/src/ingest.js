/**
 * POST /api/ingest — keeps the `wh-books` Vectorize index in step with the published books.
 * Called by scripts/ingest-books.mjs from GitHub Actions. Protected by the INGEST_TOKEN secret.
 *
 * One page per request keeps each call small (Workers subrequest and CPU limits).
 *   { op:'manifest', book }                                   -> { pages: { "<page>": "<content hash>" } }
 *   { op:'upsert', book, page, hash, title, entries:[{section, anchor, text}] }
 *   { op:'prune',  book, keep:["<page>", ...] }               -> removes pages that no longer exist
 */

import { normalizePage, pageKey, sha1hex } from './pepper-common.js';

const EMBED_MODEL = '@cf/baai/bge-small-en-v1.5';
const EMBED_BATCH = 20;
const MAX_CHUNK   = 1200;
const MIN_CHUNK   = 60;

/** Split text into ~MAX_CHUNK pieces on sentence boundaries, carrying the last sentence over as overlap. */
export function chunkText(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length < MIN_CHUNK) return clean ? [clean] : [];
  const sentences = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9“"(\[])/).flatMap((s) => {
    const out = [];
    for (let i = 0; i < s.length; i += MAX_CHUNK) out.push(s.slice(i, i + MAX_CHUNK));
    return out;
  });
  const chunks = [];
  let cur = '';
  let last = '';
  for (const s of sentences) {
    if (cur && cur.length + s.length + 1 > MAX_CHUNK) {
      chunks.push(cur);
      cur = last && last.length < 300 ? `${last} ${s}` : s;
    } else {
      cur = cur ? `${cur} ${s}` : s;
    }
    last = s;
  }
  if (cur) chunks.push(cur);
  return chunks.filter((c) => c.length >= MIN_CHUNK || chunks.length === 1);
}

async function authorised(request, env) {
  if (!env.INGEST_TOKEN) return false;
  const given = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  // Compare digests so timing does not leak the token.
  const [a, b] = await Promise.all([sha1hex(given, 40), sha1hex(env.INGEST_TOKEN, 40)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

let tableReady = false;
async function ensureTable(env) {
  if (tableReady) return;
  await env.DB.exec('CREATE TABLE IF NOT EXISTS book_pages (book TEXT NOT NULL, page TEXT NOT NULL, hash TEXT NOT NULL, nchunks INTEGER NOT NULL, PRIMARY KEY (book, page))');
  tableReady = true;
}

const vectorId = (book, key, i) => `${book.slice(0, 16)}_${key}_${i}`;

async function deleteIds(env, ids) {
  for (let i = 0; i < ids.length; i += 100) await env.VECTORIZE_BOOKS.deleteByIds(ids.slice(i, i + 100));
}

export async function handleIngest(request, env) {
  const json = (obj, status = 200) => Response.json(obj, { status });
  if (!(await authorised(request, env))) return json({ error: 'Unauthorized.' }, 401);
  if (!env.AI || !env.VECTORIZE_BOOKS || !env.DB) return json({ error: 'Bindings missing.' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const { op, book } = body;
  if (!/^[a-z0-9][a-z0-9-]{1,48}$/.test(book || '')) return json({ error: 'Bad book.' }, 400);
  await ensureTable(env);

  if (op === 'manifest') {
    const { results } = await env.DB.prepare('SELECT page, hash FROM book_pages WHERE book = ?1').bind(book).all();
    return json({ pages: Object.fromEntries(results.map((r) => [r.page, r.hash])) });
  }

  if (op === 'prune') {
    const keep = new Set((body.keep || []).map(normalizePage));
    const { results } = await env.DB.prepare('SELECT page, nchunks FROM book_pages WHERE book = ?1').bind(book).all();
    let removed = 0;
    for (const r of results) {
      if (keep.has(r.page)) continue;
      const key = await pageKey(r.page);
      await deleteIds(env, Array.from({ length: r.nchunks }, (_, i) => vectorId(book, key, i)));
      await env.DB.prepare('DELETE FROM book_pages WHERE book = ?1 AND page = ?2').bind(book, r.page).run();
      removed++;
    }
    return json({ removed });
  }

  if (op === 'upsert') {
    const page  = normalizePage(body.page);
    const key   = await pageKey(page);
    const title = String(body.title || '').slice(0, 200);
    const base  = (env.SITE_URL || 'https://wayward.house').replace(/\/$/, '');

    const items = [];
    for (const e of body.entries || []) {
      const section = String(e.section || '').slice(0, 200);
      const url = `${base}/${book}/${page}${e.anchor ? `#${e.anchor}` : ''}`;
      for (const text of chunkText(e.text)) {
        items.push({ section, url, text, embed: `${title}${section ? ` › ${section}` : ''}\n${text}` });
      }
    }

    const prev = await env.DB.prepare('SELECT nchunks FROM book_pages WHERE book = ?1 AND page = ?2').bind(book, page).first();
    const vectors = [];
    for (let i = 0; i < items.length; i += EMBED_BATCH) {
      const batch = items.slice(i, i + EMBED_BATCH);
      const res = await env.AI.run(EMBED_MODEL, { text: batch.map((b) => b.embed) });
      batch.forEach((b, j) => vectors.push({
        id: vectorId(book, key, i + j),
        values: res.data[j],
        metadata: { book, page: key, title, section: b.section, url: b.url, text: b.text, chunk: i + j },
      }));
    }
    for (let i = 0; i < vectors.length; i += 100) await env.VECTORIZE_BOOKS.upsert(vectors.slice(i, i + 100));
    if (prev && prev.nchunks > vectors.length) {
      await deleteIds(env, Array.from({ length: prev.nchunks - vectors.length }, (_, i) => vectorId(book, key, vectors.length + i)));
    }
    await env.DB
      .prepare('INSERT INTO book_pages (book, page, hash, nchunks) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(book, page) DO UPDATE SET hash = ?3, nchunks = ?4')
      .bind(book, page, String(body.hash || ''), vectors.length)
      .run();
    return json({ page, chunks: vectors.length });
  }

  return json({ error: 'Unknown op.' }, 400);
}
