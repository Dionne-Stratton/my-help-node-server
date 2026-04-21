# my-help-node-server

Cloudflare **Worker** + **D1** API for the my-help project. Entry: `api/worker.js` (see `wrangler.toml`).

## Requirements

- Node.js 18+
- A Cloudflare account (for deploy) and Wrangler CLI

## Setup

```bash
npm install
```

Set your OpenAI key for local dev (Wrangler reads this file; do not commit it):

```bash
# .dev.vars in project root
OPENAI_API_KEY=sk-...
```

Or: `npx wrangler secret put OPENAI_API_KEY` (deployed Workers).

Apply D1 migrations once (local or remote DB per Wrangler docs):

```bash
npx wrangler d1 migrations apply my-help-db --local
```

## Run locally

```bash
npm run dev
```

Then call the Worker URL Wrangler prints (often `http://localhost:8787`):

```bash
curl -X POST http://localhost:8787/api/help \
  -H "Content-Type: application/json" \
  -d '{"input":"I feel anxious"}'
```

## Layout

```text
api/
  worker.js              # Worker entry (fetch handler)
  services/              # Business logic (OpenAI, D1, matching)
  migrations/            # D1 SQL migrations
wrangler.toml
```
