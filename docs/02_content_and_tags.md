# Content & Tagging (Version 1)

## Overview

Version 1 uses a curated content library to provide spiritually helpful resources based on what a user is experiencing.

AI is used only to interpret the user’s message into themes. The system then retrieves matching resources from a structured, tagged library.

The quality of results depends heavily on:

- clear resource structure
- consistent tagging
- disciplined vocabulary

---

## Resource Types

Version 1 supports four resource types:

- Scripture
- Prayer
- Reflection
- Song

Mini-sermons are not a separate type in Version 1. If used, they should be adapted into reflections or linked externally.

---

## Resource Structure

Each resource includes a consistent core set of fields.

### Common Fields

- id
- type
- slug
- title
- short_summary
- body_text or content_url
- media_url (for songs)
- image_url (optional)
- tags
- optional scripture_reference
- status

---

## Resource Type Details

### Scripture

- scripture_reference
- translation (WEB recommended)
- full text (stored in DB for v1)
- tags
- optional summary

Scripture should be treated as a first-class resource, not dynamically generated.

---

### Prayer

- title
- prayer text
- tags
- optional scripture_reference
- short summary

Prayers should be:

- short
- immediately usable
- emotionally aligned

---

### Reflection

- title
- reflection text
- tags
- optional scripture_reference
- short summary

Reflections should be:

- concise
- readable in one sitting
- directly applicable

---

### Song

- title
- short summary
- tags
- media_url (MP3 / streaming)
- optional lyrics excerpt
- optional image

Songs should:

- align emotionally
- point toward God (worship, trust, surrender, etc.)

---

## Tagging System

Tags are the foundation of matching.

All tags exist in a **single unified system**, but are categorized for clarity.

### Tag Categories

**Emotions**

- anxiety
- fear
- grief
- shame
- loneliness
- discouragement
- frustration

**Themes**

- trust
- hope
- surrender
- identity
- God’s faithfulness
- comfort
- perseverance

**Situations**

- temptation
- waiting
- conflict
- suffering
- uncertainty
- spiritual dryness
- directionless

---

## Tagging Philosophy

### Keep It Tight

- avoid creating too many tags
- prefer consistent reuse over new variants
- merge similar concepts rather than splitting prematurely

---

### Prefer Core Issues

Tags should reflect:

- what the person is experiencing
- not just surface wording

Example:

“I feel stuck and nothing is working”
→ helplessness (not just frustration)

---

### Tag Count Per Resource

Each resource should have:

**3 to 6 meaningful tags**

Avoid:

- under-tagging (poor matching)
- over-tagging (noise)

---

### Tag Types in Practice

A strong resource often includes a mix of:

- 1–2 emotional tags
- 1–2 situational tags
- 1–2 solution/theme tags

---

## Scripture Anchoring

Some resources (especially prayers and reflections) are intentionally based on a specific Scripture passage.

These may include:

- scripture_reference field

This enables bundle coherence (handled later in matching logic).

---

## Content Length Guidance

Version 1 prioritizes **immediate usefulness**:

- prayers → short
- reflections → brief
- scripture → readable passages
- songs → quick access

Long-form content should be linked externally if needed.

---

## Content Quality Standard

All resources should:

- align with Scripture
- reflect a pastoral tone
- encourage turning toward God
- avoid harsh or condemning language

---

## Response Model (Conceptual)

When a user submits input:

1. AI identifies themes
2. backend retrieves tagged resources
3. system builds a bundle:

- 2–3 Scripture
- 1 prayer
- 1 reflection
- 1 song

---

## Content Gaps (Important)

Not every solution tag will naturally map to songs.

Examples:

- self-control
- escape from temptation
- reconciliation
- wisdom

These may:

- rely more heavily on Scripture + prayer
- optionally omit song in some cases

This is expected and acceptable in Version 1.

---

## Future Content Expansion

Future improvements may include:

- deeper reflections
- expanded scripture sets
- multiple prayers per theme
- improved song coverage
- admin tools for content management

---
