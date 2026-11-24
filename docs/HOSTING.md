# Hosting — how wayward.house is published

**Cost target: $0.** Everything a reader loads is static on GitHub Pages. The only Cloudflare compute is one Worker bound to `wayward.house/api/*` (Pepper and the newsletter endpoints), on the Workers **Free** plan, which can't bill.

| Path | Source repo | Built by |
|---|---|---|
| `/` and hub pages | `waywardhouse.github.io` (this repo, formerly `waywardhouse-hub`) | `.github/workflows/pages.yml` |
| `/essays/*` | `wh-essays` | rendered by this repo's `pages.yml` |
| `/signals/*` | `wh-signals` | rendered by this repo's `pages.yml` |
| `/computational-geography/` | `computational-geography` | that repo's `pages.yml` |
| `/mathematics/` | `mathematics` | ″ |
| `/math-for-data-science-ai/` | `math-for-data-science-ai` | ″ |
| `/data-engineering/` | `data-engineering` | ″ |
| `/systems-thinking/` | `systems-thinking` | ″ |
| `/api/*` | `worker/` in this repo | `.github/workflows/api.yml` → Cloudflare Worker |

Books get their path from GitHub itself: this repo is the org site and owns the `wayward.house` domain, so any public org repo with Pages enabled is served at `wayward.house/<repo-name>/`. **The repo name is the URL.**

Day to day: push to `main`, and the site updates in about 3 minutes. An essay or signal edit appears on the hub's next build: right away if `HUB_DISPATCH_TOKEN` is set in that repo, otherwise on the next hub push or the daily 09:17 UTC build. The Actions tab → *Publish site* → *Run workflow* rebuilds on demand.

---

## One-time migration (Nov 2026)

### Phase 1 — core site back online (GitHub + DNS only)

1. **Cloudflare → Workers & Pages → Plans:** switch to **Free**. This is what makes cost $0 a guarantee rather than a hope.
2. **GitHub, old org site** `WaywardHouse/waywardhouse.github.io`: Settings → Pages → remove the custom domain → Save. Then Settings → General → rename it `waywardhouse-legacy-site` and archive it.
3. **GitHub, this repo** `WaywardHouse/waywardhouse-hub`: Settings → General → rename to `waywardhouse.github.io`. Then Settings → Pages → Source: **GitHub Actions**.
4. **Push** (local clone):
   ```bash
   cd ~/Documents/GitHub/waywardhouse-hub
   git remote set-url origin https://github.com/WaywardHouse/waywardhouse.github.io.git
   git push
   ```
   Wait for *Publish site* to go green in the Actions tab (~4 min). Check it at https://waywardhouse.github.io/.
5. **Settings → Pages → Custom domain:** `wayward.house` → Save.
6. **Cloudflare DNS** for `wayward.house`, all **DNS only (grey cloud)** for now:
   | Type | Name | Content |
   |---|---|---|
   | A | `@` | 185.199.108.153 |
   | A | `@` | 185.199.109.153 |
   | A | `@` | 185.199.110.153 |
   | A | `@` | 185.199.111.153 |
   | AAAA | `@` | 2606:50c0:8000::153 |
   | AAAA | `@` | 2606:50c0:8001::153 |
   | AAAA | `@` | 2606:50c0:8002::153 |
   | AAAA | `@` | 2606:50c0:8003::153 |
   | CNAME | `www` | waywardhouse.github.io |

   Keep the existing Resend DKIM/SPF/MX records.
7. When GitHub's Pages settings show the certificate as issued (usually 15–60 min), tick **Enforce HTTPS**. The core site is now live at https://wayward.house.

Recommended: Org settings → Pages → **Add a verified domain** → `wayward.house`. This stops anyone else's repo from claiming the domain.

### Phase 2 — Pepper and newsletter (`/api/*`)

1. **Cloudflare DNS:** switch the apex A/AAAA records to **Proxied (orange)**. SSL/TLS → Overview → **Full** (not *strict*: GitHub renews its certificate over HTTP, which can fail behind the proxy, and *Full* keeps working if that happens). The Worker route only fires on proxied traffic.
2. Delete any leftover Workers from the old setup that claim `wayward.house/api/*` (e.g. `wayward-house-subscribe`). Otherwise the route will clash.
3. **Deploy the Worker:** Actions → *Deploy API worker* → Run workflow. It uses the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. If the old token was scoped to Pages only, create a new one from the **Edit Cloudflare Workers** template, add D1 and Vectorize edit permissions, and replace the secret.
4. **Cloudflare → Workers → wayward-house-api → Settings → Variables and secrets:** add secret `RESEND_API_KEY`.
5. Test: open https://wayward.house/ask/ and ask Pepper something; subscribe with a test address.

Free-plan limits worth knowing: 100k Worker requests/day (API calls only), Workers AI 10k neurons/day. That is roughly 70 Pepper answers a day on Llama 3.3 70B; switch `LLM_MODEL` in `worker/src/ask.js` to `@cf/meta/llama-3.1-8b-instruct-fast` for several times more. If a limit is hit, Pepper replies with an error until 00:00 UTC. Nothing is charged.

### Phase 3 — books

For each repo: rename, make public, enable Pages, push.

| Rename from | To |
|---|---|
| `waywardhouse-computational-geography` | `computational-geography` |
| `waywardhouse-maths` | `mathematics` |
| `waywardhouse-data-ai` | `math-for-data-science-ai` |
| `waywardhouse-data-engineering` | `data-engineering` (already public) |
| `waywardhouse-systems-thinking` | `systems-thinking` |

In each repo: Settings → General → rename, then Danger Zone → Change visibility → Public. Next, Settings → Pages → Source: **GitHub Actions**. Then `git push` from the local clone; GitHub redirects the old remote URL. Run `git remote set-url origin …` with the new name when convenient.

### Phase 4 — clean up

- `wh-essays`, `wh-signals`: push (their workflow now only pings the hub). Optional: add secret `HUB_DISPATCH_TOKEN` (fine-grained PAT → repo `waywardhouse.github.io` → Contents: read & write) for instant rebuilds.
- `waywardhouse-site`: push (removes its old publish workflow). It stays as the home of the Quarto brand extension.
- Archive `essays` and `signals`. They are April duplicates of `wh-essays` / `wh-signals` and still carry Cloudflare deploy workflows.
- Cloudflare: delete the old Pages projects if any remain (`wayward-house`, `wh-*`). Remove the `CLOUDFLARE_*` secrets from repos that no longer use them; only this repo needs them.
