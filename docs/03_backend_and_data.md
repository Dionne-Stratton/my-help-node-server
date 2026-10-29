> Design notes: see [Current accounts and saved bundles](05_accounts_and_saved_bundles.md) for implemented authentication, storage, and API behavior. Whole bundles are saved; independent browsing remains undecided. Clarification and fallback behavior described here should be checked against the current handler before treating it as implemented.

# Backend & Data (Version 1)

## Overview

The backend is responsible for:

- receiving user input
- interpreting themes via AI
- mapping themes to solution tags
- retrieving matching resources
- assembling a structured help bundle

The system is designed to be:

- deterministic after interpretation
- database-driven
- scalable for future expansion

---

## High-Level Flow

1. Client sends input to `/api/help`
2. AI interprets input into problem tags
3. Backend maps problem tags → solution tags
4. Backend retrieves matching resources
5. System assembles final bundle
6. Response returned to client

---

## Architecture

### Frontend

- React application
- Sends user input
- Displays structured bundle

---

### Backend

- Cloudflare Worker (`api/worker.js`), with D1 storage
- Handles routing, logic, and orchestration

---

### AI Layer

- OpenAI API
- Used only for:
  - interpreting input into approved tags

AI does NOT:

- generate final content
- make decisions about resource selection

---

### Database

- SQLite (Cloudflare D1 in production)
- Stores:
  - resources
  - tags
  - mappings
  - account-owned saved bundle snapshots

---

## Database Design

### Core Principle

The system uses a **tag-driven matching model**.

Resources are not hardcoded to problems.
They are matched dynamically through tags.

---

## Tables

### resources

Stores all content.

Fields include:

- id (primary key)
- type (scripture, prayer, reflection, song)
- slug
- title
- short_summary
- body_text
- media_url (songs)
- image_url
- lyrics_text (songs)
- scripture_reference (optional)
- scripture_translation (optional)
- status
- created_at
- updated_at

---

### tags

Stores all tags.

Fields include:

- id
- name
- type (problem or solution)

---

### resource_tags

Join table between resources and tags.

Fields:

- resource_id
- tag_id

Each resource can have multiple tags.

---

## Tag Types

Two main types:

### Problem Tags

Derived from user input via AI.

Examples:

- anxiety
- guilt
- loneliness
- fear

---

### Solution Tags

Used for matching resources.

Examples:

- comfort
- hope
- trust
- surrender

---

## Mapping Logic

Problem tags are mapped to solution tags.

This is done via a deterministic mapping function.

Example:

- anxiety → comfort, peace, trust
- guilt → forgiveness, grace
- loneliness → presence, love

This mapping is **not handled by AI**.

---

## Matching Logic (Overview)

Each resource has solution tags.

Matching works by:

- comparing resource tags to solution weights
- scoring based on overlap

Score increases when:

- resource matches multiple solution tags
- resource aligns strongly with dominant themes

---

## Scoring Principles

- higher overlap = higher score
- stronger tags weigh more
- multiple problem tags reinforce shared solutions

This produces a ranked list of resources.

---

## Bundle Assembly (Important)

The system does NOT return raw ranked results.

Instead, it builds a structured bundle:

### Bundle Structure

- 2–3 Scripture
- 1 prayer
- 1 reflection
- 1 song (if available)

---

### Selection Rules

- highest scoring items are selected per type
- duplicates are avoided
- balance is prioritized over raw ranking

---

### Scripture Expansion Rule

After selecting top scripture:

- if prayer has a different scripture → include it
- if reflection has a different scripture → include it

This results in:

👉 3–5 total scripture passages

---

## API

### POST `/api/help`

Main endpoint.

Request:

- input (string)
- optional sessionId
- optional clarificationAttempted flag

---

### Response

Returns:

- interpretation (primary + secondary tags)
- problem tags
- solution weights
- results (ranked internally)
- final bundle (frontend-facing)

---

## Clarification Logic

If interpretation is weak:

- system may request clarification
- only one clarification allowed
- fallback must always return a bundle

---

## Migration Strategy

Database changes are handled through SQL files.

Each migration:

- is executed manually or via Wrangler
- applies schema or seed updates

---

### Execution Pattern

```bash
npx wrangler d1 execute my-help-db --local --file=./api/migrations/<file>.sql
```

Migrations are:

- incremental
- ordered
- non-destructive when possible

---

## Data Integrity

- foreign keys enforce relationships
- resource_tags must reference valid resources
- tag usage must be consistent

---

## Future Backend Considerations

- move mapping logic into DB (optional)
- caching results
- analytics tracking
- user session persistence
- scalable search improvements

---
