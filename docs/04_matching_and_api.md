# Matching Logic & API Behavior (Version 1)

## Overview

This document defines:

- how user input is interpreted
- how tags are mapped
- how resources are scored
- how the final help bundle is assembled
- how the API responds

This is the core logic of the system.

---

## Step 1 — AI Interpretation

User input is sent to the AI layer.

The AI returns:

- one **primary problem tag**
- zero to three **secondary problem tags**

Tags must come from the approved tag list.

---

### Interpretation Requirements

- must select from approved tags only
- must return structured JSON
- must avoid inventing tags
- must choose the closest meaningful match

---

## Step 2 — Problem → Solution Mapping

Problem tags are converted into solution tags.

This is handled by backend logic (not AI).

---

### Example Mapping

- anxiety → comfort, peace, trust
- guilt → forgiveness, grace
- loneliness → presence, love

---

### Solution Weights

Each solution tag receives a weight.

Weights increase when:

- multiple problem tags map to the same solution
- the primary tag maps strongly

This creates a weighted solution profile.

---

## Step 3 — Resource Matching

All resources are evaluated against solution tags.

---

### Matching Process

For each resource:

- compare its solution tags to solution weights
- calculate a score based on overlap

---

### Scoring Factors

- number of matching tags
- strength of those tags
- reinforcement from multiple problem tags

---

### Result

A ranked list of resources.

---

## Step 4 — Bundle Assembly

The system converts ranked results into a structured bundle.

---

## Bundle Structure

The bundle returned to the frontend contains:

- 2–3 Scripture passages
- 1 prayer
- 1 reflection
- 1 song (if available)

---

## Selection Rules

### Scripture

- select top 2–3 scripture resources
- prioritize diversity of passages

---

### Prayer

- select highest scoring prayer

---

### Reflection

- select highest scoring reflection

---

### Song

- select highest scoring song
- omit only if no meaningful match exists

---

## Scripture Expansion Rule

After selecting core scripture:

- if prayer references a different scripture → include it
- if reflection references a different scripture → include it

Final result:

👉 **3–5 scripture passages total**

---

## Deduplication

- no duplicate resources
- no duplicate scripture references
- avoid redundant content

---

## Bundle Philosophy

The bundle should feel:

- focused
- coherent
- pastoral
- not overwhelming

It should not:

- return large lists
- expose raw rankings
- feel like search results

---

## Step 5 — API Response

### Endpoint

POST `/api/help`

---

### Request Body

- input (string)
- sessionId (optional)
- clarificationAttempted (optional)

---

### Response Structure

The response includes:

- interpretation
- problem tags
- solution weights
- final bundle

Internal ranking data may exist but should not be required by the frontend.

---

## Clarification Handling

If interpretation is weak:

- system may ask one follow-up question
- only one clarification allowed
- second response must always return a bundle

---

## Failure Handling

If matching fails:

- fallback to general encouragement resources
- always return a usable bundle

The user should never receive an empty response.

---

# 🚀 Future Enhancement (Version 2)

## Explore More Matching Resources

Version 1 intentionally limits results to a focused bundle.

However, the system already generates additional ranked matches that are not shown.

---

## Goal

Allow users to optionally explore more resources **without overwhelming the initial experience**.

---

## Design Principles

- keep initial bundle simple
- allow deeper exploration on demand
- reuse existing ranking logic
- avoid cluttering the main UI

---

## Possible Approaches

### Option 1 — Hidden Ranked Results

Backend returns:

- top bundle (visible)
- additional ranked results (hidden)

Frontend:

- displays only bundle initially
- reveals more when user clicks “Explore More”

---

### Option 2 — Separate Endpoint

Frontend sends request:

- same interpreted tags
- excluding already shown resources

Backend returns:

- additional matching resources

---

### Option 3 — Resource-Type Expansion

Allow expansion per type:

- “More songs like this”
- “More prayers”
- “More reflections”

This is especially useful for songs.

---

## Recommended First Step

Start with:

👉 **songs only**

Reason:

- multiple songs often fit the same need
- users naturally explore music
- low risk of overwhelming the experience

---

## UX Behavior

Initial state:

- 1 song shown

If user clicks:

- reveal additional songs
- or fetch more

---

## Backend Considerations

To support this:

- retain ranked results (do not discard)
- optionally include extra results in response
- or support a follow-up query

---

## Important Constraint

This feature must remain:

👉 **optional and user-initiated**

The system should never:

- auto-expand results
- overwhelm the user
- replace the focused bundle

---

## Long-Term Possibilities

- expand to all resource types
- allow saving bundles
- personalized recommendations
- learning user preferences

---

## Final Principle

The system should always:

- guide first
- expand second

Never the reverse.

---
