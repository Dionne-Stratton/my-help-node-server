# Current accounts and saved bundles

This describes `feature/auth0-saved-bundles`. The backend runs as a Cloudflare Worker with D1, not an Express server. See the README for setup and the complete saved-bundle route table.

## Public help requests

`POST /api/help` accepts `{ input, sessionId? }` without authentication. It returns `sessionId`, `primaryTag`, `interpretation`, `bundle`, and `debug`. The bundle contains resource arrays plus problem and weighted solution tags. The existing debug response includes the input, interpretation, and ranked resources; it is not stored as part of a saved bundle.

`primaryTag` comes from the existing interpretation and supports the frontend's suggested name without another AI call. This account feature does not change scoring, mapping weights, or anchor selection. The current handler does not persist help-request history or implement a clarification exchange; those descriptions in older design notes remain proposals.

## Authentication and ownership

Auth0 Universal Login handles accounts. The API verifies RS256 access tokens using the configured issuer's JWKS, expected API audience, expiry, subject, authorized SPA client, and required scope. ID tokens are not API credentials. Ownership comes only from the verified subject, never from a browser-supplied user ID.

Saved routes require `read:saved_bundles` for reads and `write:saved_bundles` for saves, renames, and deletes. Each item query is constrained by its owner. Responses use `Cache-Control: no-store`. CORS permits Authorization and Content-Type headers and GET, POST, PATCH, DELETE, and OPTIONS methods.

## Storage and requests

Migration `003_saved_bundles.sql` adds `saved_bundles` with `id`, `user_subject`, `source_id`, `title`, `bundle_json`, and `created_at`, an owner index, and uniqueness on `(user_subject, source_id)`.

POST `/api/saved-bundles` accepts:

```json
{
  "sourceId": "client-generated-moment-id",
  "title": "Sad",
  "resourceIds": {
    "scripture": ["published-scripture-id"],
    "prayer": [],
    "reflection": [],
    "song": []
  }
}
```

The server reads published resources by ID and type to create the snapshot; browser-supplied resource content is not trusted. Original input and interpretation/debug data are not saved. Repeating a source ID for the same owner returns the existing save. Different source IDs may use the same name.

A supplied title is trimmed, must contain 1–120 characters, and cannot contain line breaks or ASCII control characters. Omitted POST titles default to **A saved moment**. PATCH `/api/saved-bundles/:id` requires `{ "title": "New name" }` and changes only the title, preserving content and save date. A new name for an existing save uses PATCH, not a repeated POST.

GET collection returns up to 20 summaries at a time, newest first, with `nextCursor`; use `?before=CURSOR` for the next page. Item GET returns the stored snapshot, and DELETE removes the owner's save. There are no implemented individual-resource, browsing, tag-list, or profile-sync endpoints.

## Verification and follow-up

`npm test` verifies signed JWT handling and real SQLite ownership queries, scopes, pagination, request limits, snapshot construction, duplicate retries, and naming/renaming. It does not call OpenAI or send Auth0 emails. The user has tested local sign-in, saving, and renaming; signup, password reset, logout, and multi-account isolation remain release smoke checks.

Apply only missing schema on existing databases; do not rerun historical seed inserts. See the README for the targeted local command. Naming needs no migration beyond `003_saved_bundles.sql`. Deploy schema and backend before the matching frontend.

Independent resource browsing remains undecided. Auth0’s English login/signup descriptions and consent wording now use `${clientName}` instead of referencing the music-site account. The shared music logo was removed; a generic Auth0 icon remains in the verified hosted pages. These live tenant changes require no backend deployment or migration. Use separate feature branches for browsing if approved and for future scoring/weighting changes.
