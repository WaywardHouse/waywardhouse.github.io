/**
 * Pepper inside a book: answers from ONE book's index (Vectorize `wh-books`),
 * preferring the chapter the reader is on and backfilling from the rest of the book.
 *
 * Called from ask.js when the request body carries `book`.
 *   body: { question, book: "computational-geography", page?: "foundations/x.html" }
 *   Omit `page` to search the whole book.
 */

import { pageKey, takeTicket, asleepResponse, isQuotaError, markAsleep, streamWithSources } from './pepper-common.js';

const EMBED_MODEL  = '@cf/baai/bge-small-en-v1.5';
const DEFAULT_LLM  = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const CHAPTER_K    = 4;
const BOOK_K       = 6;
const MAX_CONTEXT  = 7;
const MIN_SCORE    = 0.35;   // drop obvious junk; relevant bge-small matches usually score well above this

const SYSTEM_PROMPT = `You are Pepper, a blind Labrador who loves geography and has read this book cover to cover by smell. You sit next to the reader while they study and help them understand what the book says.

Answer using ONLY the context passages provided. Passages marked "This chapter" come from the page the reader is on; passages marked "Elsewhere in the book" come from other chapters. Prefer the current chapter, and when the answer lives elsewhere, say which chapter or section covers it so the reader can go there.

If the passages don't cover the question, say so plainly, for example "my nose isn't picking that up in this book", and suggest where in the book to look if the passages hint at it. Never invent facts, numbers, formulas or citations to fill a gap.

Voice: warm, clear and a little dry, like a good study partner. Explain the idea first, then the detail. Define a term the first time you use it. Keep answers short (usually one to four short paragraphs). Don't open with "Great question". Don't refer to "the context" or "the passages"; just answer as if you know the book.

Write all mathematics in plain English prose. Do not use LaTeX, dollar signs, backslash commands or any markup notation. Write "the slope equals rise divided by run" not "$m = \\Delta y / \\Delta x$". Spell out Greek letters and subscripts simply: "alpha", "T_air".`;

function cors(env) {
  return {
    'Access-Control-Allow-Origin':  env?.SITE_URL || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function handleBookAsk({ question, book, page }, env) {
  const headers = cors(env);
  if (!env.AI || !env.VECTORIZE_BOOKS) {
    return Response.json({ error: 'Pepper is not set up for books yet.' }, { status: 503, headers });
  }
  if (!/^[a-z0-9][a-z0-9-]{1,48}$/.test(book || '')) {
    return Response.json({ error: 'Unknown book.' }, { status: 400, headers });
  }
  if (page != null && (typeof page !== 'string' || page.length > 300)) {
    return Response.json({ error: 'Bad page.' }, { status: 400, headers });
  }

  const ticket = await takeTicket(env);
  if (!ticket.ok) return asleepResponse(headers);

  try {
    const embed  = await env.AI.run(EMBED_MODEL, { text: [question] });
    const vector = embed.data[0];

    const chapterKey = page ? await pageKey(page) : null;
    const [chapterRes, bookRes] = await Promise.all([
      chapterKey
        ? env.VECTORIZE_BOOKS.query(vector, { topK: CHAPTER_K, filter: { book, page: chapterKey }, returnMetadata: 'all' })
        : Promise.resolve({ matches: [] }),
      env.VECTORIZE_BOOKS.query(vector, { topK: BOOK_K, filter: { book }, returnMetadata: 'all' }),
    ]);

    // Chapter passages first, then book-wide ones we have not already got.
    const seen = new Set();
    const picked = [];
    for (const [matches, scope] of [[chapterRes.matches || [], 'chapter'], [bookRes.matches || [], 'book']]) {
      for (const m of matches) {
        if (seen.has(m.id) || (m.score ?? 1) < MIN_SCORE) continue;
        seen.add(m.id);
        // A book-wide hit on the current page is still "this chapter".
        const here = chapterKey && m.metadata?.page === chapterKey;
        picked.push({ m, scope: scope === 'chapter' || here ? 'chapter' : 'book' });
      }
    }
    const used = picked.slice(0, MAX_CONTEXT);

    if (used.length === 0) {
      return Response.json(
        { answer: "My nose isn't picking that up in this book. Try rephrasing it, or ask about something the chapters cover directly." },
        { headers },
      );
    }

    const context = used.map(({ m, scope }, i) => {
      const where = scope === 'chapter' ? 'This chapter' : 'Elsewhere in the book';
      const label = [m.metadata?.title, m.metadata?.section].filter(Boolean).join(' › ');
      return `[${i + 1}] (${where}) ${label}\n${m.metadata?.text ?? ''}`;
    }).join('\n\n---\n\n');

    const seenUrl = new Set();
    const sources = [];
    for (const { m, scope } of used) {
      const url = m.metadata?.url;
      if (!url || seenUrl.has(url)) continue;
      seenUrl.add(url);
      sources.push({ title: m.metadata?.title || '', section: m.metadata?.section || '', url, scope });
    }

    const aiStream = await env.AI.run(env.PEPPER_MODEL || DEFAULT_LLM, {
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: `Context:\n\n${context}\n\n---\n\nQuestion: ${question}` },
      ],
      stream: true,
      max_tokens: 900,
    });
    return streamWithSources(aiStream, sources, headers);
  } catch (err) {
    if (isQuotaError(err)) { markAsleep(); return asleepResponse(headers); }
    console.error('book ask error:', err);
    return Response.json({ error: 'Something went wrong. Try again.' }, { status: 500, headers });
  }
}
