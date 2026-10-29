# Vision & Product (Version 1)

## Vision / Purpose

This project is a digital tool designed to help people turn toward God in moments of emotional or spiritual struggle.

When someone feels anxious, discouraged, lonely, ashamed, or overwhelmed, the app helps guide them toward Scripture, prayer, worship, and reflection that point them back to God’s truth and presence.

The goal is not to replace pastoral care or counseling, but to provide spiritual support in moments when someone needs encouragement, especially when they are alone or outside normal ministry hours.

The experience is designed to feel pastoral, gentle, and grounded in Scripture. The app should help users feel understood, comforted, and encouraged to seek God through His Word.

Primary ways the app helps users:

- presenting relevant Bible passages
- offering prayers for specific struggles
- recommending worship songs
- providing short devotional reflections

The app’s tone and approach are pastoral rather than clinical. Its purpose is to guide people toward God rather than offer psychological diagnosis or therapy.

The primary audience is Christians seeking encouragement and spiritual help during difficult moments. However, the app is also open to anyone seeking spiritual or emotional support. For users who are not believers, the app may gently introduce the hope of the gospel and the person of Jesus.

---

## MVP Feature Scope (Version 1)

The goal of Version 1 is to create a simple, reliable tool that helps users turn toward God during moments of emotional or spiritual struggle.

### Core Features

### 1. Natural Language Input

Users can describe what they are going through in their own words.

### 2. AI Theme Interpretation

AI interprets input into approved emotional/spiritual tags.

### 3. Resource Library

Curated resources:

- Scripture
- prayers
- reflections
- songs

### 4. Help Results (Bundle)

Users receive a structured bundle:

- 2–3 Scripture passages
- 1 prayer
- 1 reflection
- 1 song

### 5. Save Resources

Users can save individual resources.

### 6. Optional Accounts

Accounts are only required for cross-device saving.

---

## Out of Scope (Version 1)

- church integrations
- contributor systems
- advanced sharing
- counseling networks

---

## User Flows (Version 1)

### Flow 1 — Request Help

1. User enters message
2. Backend interprets themes
3. System builds help bundle
4. User receives:
   - Scripture
   - prayer
   - reflection
   - song

---

### Flow 1A — Clarification

If initial match is weak:

- ask ONE follow-up question
- do not loop indefinitely
- second result must always return a bundle

---

### Flow 2 — Save Resource

User clicks save:

- if not logged in → prompt login
- if logged in → store resource

---

### Flow 3 — Account Creation

Optional
Used for:

- cross-device saving

---

### Flow 4 — Saved Resources

User accesses saved:

- scriptures
- prayers
- reflections
- songs

---

### Flow 5 — Explore Mode (Optional)

Users may browse without submitting input.

---

## Product Principles

- immediate access to help
- Scripture-centered
- curated over generated content
- simple and calm UX
- pastoral tone

---

## Safety and Boundaries

### Purpose

Spiritual encouragement — not therapy.

### AI Limits

AI:

- interprets input
- does NOT give advice

### Crisis Handling

If severe distress is detected:

- encourage reaching real help
- provide crisis resources
- do not attempt to handle alone

### Tone

- gentle
- compassionate
- grounded in truth

---

## Future Considerations

- deeper guidance
- sharing bundles
- admin tools
- analytics expansion

---
