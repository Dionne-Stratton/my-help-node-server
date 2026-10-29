# my-help-node-server

Cloudflare **Worker** + **D1** API for the my-help project. Entry: `api/worker.js` (see `wrangler.toml`).

## Requirements

- Node.js 22.13+ (or Node 24) for the documented test workflow
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

For a fresh local database, apply the checked-in schema migrations:

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

## Optional Auth0 accounts and saved bundles

The `/api/help` endpoint remains public. `/api/saved-bundles` requires a signed
RS256 Auth0 API access token; its issuer, audience, expiry, subject, and authorized
application are checked with `jose` and the tenant's cached public JWKS.
`AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, and `AUTH0_CLIENT_ID` are public configuration in
`wrangler.toml`, not secrets. Do not use an ID token as the API bearer token.

| Method | Route | Scope | Behavior |
| --- | --- | --- | --- |
| GET | `/api/saved-bundles` | `read:saved_bundles` | Returns up to 20 summaries, newest first, and `nextCursor` |
| GET | `/api/saved-bundles?before=CURSOR` | `read:saved_bundles` | Next page |
| POST | `/api/saved-bundles` | `write:saved_bundles` | Saves a published-resource snapshot |
| GET | `/api/saved-bundles/:id` | `read:saved_bundles` | Loads the caller's saved bundle |
| PATCH | `/api/saved-bundles/:id` | `write:saved_bundles` | Renames the caller's bundle with `{ "title": "New name" }` |
| DELETE | `/api/saved-bundles/:id` | `write:saved_bundles` | Removes the caller's saved bundle |

POST body: `{ "sourceId": "a-client-generated-moment-id", "resourceIds": {
"scripture": ["resource-id"], "prayer": [], "reflection": [], "song": [] } }`.
An optional `title` is trimmed and must contain 1-120 characters without line
breaks or control characters; the default is "A saved moment". PATCH requires a
valid title and checks the same owner and write scope as save/delete. Duplicate
names are allowed for separate requests. Renaming changes neither the resource
snapshot nor the original save date, and requires no new migration. The same source ID saves only once per account. Snapshot
content is read from published database resources, never trusted from browser
content. Ownership always comes from the verified token subject; client-supplied
user IDs have no effect. Responses are `Cache-Control: no-store`. Original help
input is not included in saved bundles. No billing or subscriptions are added.

For an existing local database, apply only `003_saved_bundles.sql` if its table
is missing, then start `npm run dev` (normally port 8787):

```bash
npx wrangler d1 execute my-help-db --local --file=./api/migrations/003_saved_bundles.sql
```

If this schema has already been applied successfully, skip it. Older seed files
may have been executed manually without Wrangler migration-history entries;
rerunning their inserts can produce UNIQUE constraint errors. Do not rerun all
historical seeds to test saving. These account changes need only the new table
and index; naming and renaming add no further migration.
 Use the
matching frontend branch `feature/auth0-saved-bundles`, which uses port 5173.
For release, apply the missing saved-bundle schema to the intended remote database, deploy this backend, then
deploy the matching frontend. No live D1 data or Worker was changed by this work.

`npm test` runs JWT verification and SQLite-backed route tests with Node 22.13+
(or Node 24). Tests cover wrong issuers/audiences/apps/signatures, expired and ID
tokens, cross-account access, retries, unpublished resources, scopes, pagination,
and request-size limits. They do not invoke OpenAI or require private API keys.
A real Auth0 sign-in/signup/password-reset email test is still required before
release. The Auth0 app is configured for the Cloudflare frontend origin and
localhost/127.0.0.1 on port 5173; custom domains must be registered explicitly.

The public `/api/help` response includes `primaryTag`, the existing interpretation's primary problem tag, for suggesting a bundle name in the frontend. This does not make any additional AI request.

## Documentation and scope

[Current accounts and saved bundles](docs/05_accounts_and_saved_bundles.md) records
the implemented storage, ownership, and API behavior. Earlier product/design
notes remain useful background but do not establish implemented routes.
Independent browsing is undecided and has no public API in this branch. Future
browse work and matching/scoring adjustments should use separate branches.
Auth0’s shared English login/signup and consent wording uses the application
name rather than the music-site account name. The shared music logo was removed;
hosted pages currently show a generic Auth0 icon. This is live tenant
configuration, not a backend deployment or database change.
