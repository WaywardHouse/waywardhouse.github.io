# Pepper — how she works, and how to switch on the in-book version

Pepper is a Workers AI + Vectorize RAG assistant behind `POST /api/ask` (see `worker/src/`).

| Where | Index | Scope |
|---|---|---|
| `/ask/` on the hub | `wh-content` (`VECTORIZE`) | essays and signals |
| Inside every book (the "Ask Pepper" button) | `wh-books` (`VECTORIZE_BOOKS`) | **that one book**, preferring the chapter you're reading |

The in-book widget is one file, `public/pepper/book.js`, served from the hub. Each book loads it with a single line in
its theme's `include-after-body.html`; improvements ship by deploying the hub only.

## When the free allowance runs out: Pepper sleeps

Workers AI's free tier is 10,000 neurons a day, resetting at 00:00 UTC (roughly 70 answers on the 70B model).

- The Worker keeps a daily counter in D1 (`pepper_usage`). After `PEPPER_DAILY_CAP` answers (default 60, in `wrangler.toml`) it stops
  calling the AI and returns `503 { asleep: true, wakeAt }`. The cap exists so Pepper sleeps *before* the hard limit hits.
- If Workers AI itself reports a quota error, Pepper also falls asleep for the rest of the UTC day.
- The widget and `/ask/` show "Pepper's asleep" with the wake time in the reader's timezone; the widget remembers it in
  `localStorage` so a sleeping Pepper makes no further requests.
- Tuning: lower `PEPPER_DAILY_CAP` if she runs dry early; set the `PEPPER_MODEL` var to `@cf/meta/llama-3.1-8b-instruct-fast`
  to stretch the allowance several times over (at lower answer quality).
- Re-indexing uses the same allowance, which is why the daily ingest runs at 00:23 UTC, right after the reset.

## One-time setup (do these in order)

The Worker now declares a `wh-books` binding, so **create the index before pushing `worker/`**, or the deploy fails.

1. **Create the index and its metadata indexes** (metadata indexes only apply to vectors added after they exist):
   ```bash
   cd worker
   npx wrangler vectorize create wh-books --dimensions=384 --metric=cosine
   npx wrangler vectorize create-metadata-index wh-books --property-name=book --type=string
   npx wrangler vectorize create-metadata-index wh-books --property-name=page --type=string
   ```
2. **Make an ingest token and set it in two places** (same value):
   ```bash
   openssl rand -hex 32
   npx wrangler secret put INGEST_TOKEN --config worker/wrangler.toml     # on the Worker
   ```
   and GitHub → this repo → Settings → Secrets and variables → Actions → `INGEST_TOKEN`.
3. **Push this repo.** `api.yml` deploys the Worker; `pages.yml` ships `/pepper/book.js`.
4. **Fill the index:** Actions → *Ingest books for Pepper* → Run workflow. About 4,400 chunks across the five live books
   (measured Nov 2026). If the day's allowance runs out it stops cleanly (exit 3); run it again after 00:00 UTC and it resumes,
   because unchanged pages are skipped.
5. **Push each book repo** (the loader line is already added locally to `_extensions/WaywardHouse/waywardhouse-book/include-after-body.html`).
   Do this *after* step 4, otherwise Pepper answers "my nose isn't picking that up" everywhere.

From then on the daily workflow re-embeds only pages whose text changed and prunes pages that disappeared. To refresh sooner after a book
deploys, add a step to that book's `pages.yml` that sends a `repository_dispatch` of type `book-published` to this repo
(needs a fine-grained token with `contents: write` on this repo, like `HUB_DISPATCH_TOKEN`).

## How retrieval works in a book

`POST /api/ask { question, book, page }`:

1. Embed the question (`bge-small-en-v1.5`).
2. Query `wh-books` twice: top 4 from the reader's chapter (`filter: {book, page}`) and top 6 from the whole book (`filter: {book}`).
   `page` is stored as a 12-char hash of the page path, because Vectorize string indexes only look at the first 64 bytes.
3. Chapter passages first, then book-wide ones, labelled "This chapter" / "Elsewhere in the book" in the prompt so Pepper can say
   which chapter covers something. Sources are returned with section-level anchors.
4. "Whole book" in the widget omits `page`.

Source text is each book's own Quarto `search.json` (one entry per section, deep-linkable), chunked to about 1,200 characters on
sentence boundaries. Code cells are not in `search.json`, so Pepper explains the prose, not the code listings.

## Local checks

- `node scripts/ingest-books.mjs --dry` lists what would be indexed (needs `INGEST_TOKEN` and a reachable `INGEST_URL`).
- The widget can be tried on any page with `data-book`, `data-page`, `data-api` on its `<script>` tag, and exposes
  `window.WHPepper.open()` / `.ask("…")` for testing.
