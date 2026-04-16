# Checklist

# Checklist

- [x] ~~Create all Docs~~  
- [x] ~~Create Repo~~  
- [ ] Add Docs to repo  
- [x] ~~Create Simple react webpage~~  
- [ ] Create basic server  


# Random bits

Your help for this moment

My Help \- Spiritual Resource Companion

- [ ] define the **actual scoring formula** in more concrete terms, or  
- [x] ~~define the **AI output format/prompt contract** so the interpreter returns tags the backend can reliably use.~~  
- [ ] backend service responsibilities  
- [ ] define the **fallback logic** when matching is weak or AI output is bad  

# Vision / Purpose

## **Vision / Purpose**

This project is a digital tool designed to help people turn toward God in moments of emotional or spiritual struggle.

When someone feels anxious, discouraged, lonely, ashamed, or overwhelmed, the app helps guide them toward Scripture, prayer, worship, and reflection that point them back to God’s truth and presence.

The goal is not to replace pastoral care or counseling, but to provide spiritual support in moments when someone needs encouragement, especially when they are alone or outside normal ministry hours.

The experience is designed to feel pastoral, gentle, and grounded in Scripture. The app should help users feel understood, comforted, and encouraged to seek God through His Word.

Primary ways the app helps users:

• presenting relevant Bible passages  
 • offering prayers for specific struggles  
 • recommending worship songs  
 • providing short devotional reflections

The app’s tone and approach are pastoral rather than clinical. Its purpose is to guide people toward God rather than offer psychological diagnosis or therapy.

The primary audience is Christians seeking encouragement and spiritual help during difficult moments. However, the app is also open to anyone seeking spiritual or emotional support. For users who are not believers, the app may gently introduce the hope of the gospel and the person of Jesus.

# MVP Feature Scope (Version 1\)

MVP Feature Scope V1

The goal of Version 1 is to create a simple, reliable tool that helps users turn toward God during moments of emotional or spiritual struggle.

Version 1 focuses on guiding users to relevant Scripture, prayer, worship, and reflections based on what they are experiencing.

Core Features

1\. Natural Language Input

Users can describe what they are going through in their own words.

Example inputs:

• “I feel anxious.”  
• “I’m discouraged.”  
• “I feel stuck and frustrated.”  
• “I’m struggling with temptation.”

The system will interpret the user’s message and identify relevant emotional or spiritual themes.

2\. AI Theme Interpretation

AI will analyze the user’s message and map it to themes such as:

• anxiety  
• loneliness  
• discouragement  
• helplessness  
• shame  
• grief  
• temptation

The AI’s role is limited to interpreting the user’s need, not providing counseling advice.

3\. Resource Library

The system will return a set of curated resources related to the identified themes.

Resources may include:

• Bible passages  
• prayers  
• devotional reflections  
• worship songs

Songs may link to external streaming sources such as your existing music website.

Each resource will be tagged with themes so the system can match them to user needs.

4\. Help Results Page

After submitting a message, users receive a “help bundle” containing selected resources.

Example structure:

Scripture  
Relevant Bible passage

Prayer  
A short prayer related to the situation

Worship  
Suggested song

Reflection  
Short devotional thought

5\. Save Resources

Users can save individual resources such as:

• a prayer  
• a devotional  
• a scripture passage  
• a song

Saved items are stored in a personal library.

6\. Optional User Accounts

Users may create an account to save resources across devices.

If users do not create an account, resources may still be saved locally on the device.

Out of Scope for Version 1

The following ideas are intentionally excluded from Version 1 to keep the project focused:

• church content integrations  
• user-submitted devotionals or prayers  
• sermon indexing for churches  
• pastoral or counseling networks  
• contributor systems  
• advanced sharing bundles  
• church-specific resource prioritization

These ideas may be explored in later versions.

Possible Future Features

Future versions may explore:

• sharing resource bundles with others  
• deeper AI-assisted guidance  
• church integrations  
• pastor or counselor referral tools  
• collaborative content libraries

# User Flows (Version 1\)

User Flows V1

Flow 1 — Guest User Requests Help

This is the most important flow in the entire product.

User visits the website.

The home screen presents a simple prompt such as:

“What are you going through?”

The user enters a message describing their situation.

Examples:

“I feel anxious.”

“I’m discouraged.”

“I feel stuck and frustrated.”

“I’m struggling with temptation.”

The message is sent to the backend.

AI interprets the message and identifies relevant emotional or spiritual themes.

Example output:

Themes identified:

anxiety

fear

uncertainty

The backend queries the resource database using those themes.

The system assembles a help bundle containing curated resources such as:

Scripture passage

Prayer

Worship song

Short devotional reflection

The results page displays the bundle in a clear structure:

Scripture  
Relevant passage

Prayer  
Short prayer

Worship  
Suggested song with play link

Reflection  
Devotional excerpt

The user can interact with each resource:

read

listen

expand

save

Flow 1A — Clarification When Initial Match Is Weak

If the initial help response is too weak or too generic, the frontend may ask the user one clarifying follow-up question.

Example:
“Can you tell me a little more about how you’re feeling right now?”

The frontend may also provide a small set of example feeling words, such as:
anxious, afraid, alone, ashamed, discouraged, confused, overwhelmed.

The user then submits a refined response.

The frontend sends the refined input to the backend as a new help request.

If the second response is still weak, the app should stop asking for clarification and instead show the best available help bundle.

This clarification behavior should be limited to one additional prompt per help attempt, so users are not trapped in a repeated loop.

Flow 2 — Guest User Saves a Resource

The user selects Save on a resource.

If the user is not logged in, the system presents options:

Option A — Save to this device  
The resource is stored locally on the device.

Option B — Create an account  
The resource will be saved across devices.

If the user chooses local save, the resource is added to a local saved list.

The user can later access saved items through Saved Resources.

Flow 3 — User Creates an Account

Accounts are optional and primarily used for cross-device saving.

User selects Sign Up / Sign In.

User chooses authentication method (example):

email

passwordless link

social login (optional future option)

After authentication:

local saved items can optionally sync to the account

user gains persistent saved library across devices.

Flow 4 — Returning User Accesses Saved Resources

User visits the site again.

If signed in:

saved resources load from the account.

If using device storage:

saved resources load from local storage.

User opens Saved Resources.

The library shows previously saved items such as:

prayers

scriptures

devotionals

songs

User can revisit or remove saved resources.

Flow 5 — New Visitor Exploring the Site

Some users may want to explore before asking for help.

User visits the homepage.

In addition to the main prompt, optional navigation allows browsing resources such as:

popular prayers

devotionals

scripture collections

worship songs

The user can read or listen to content without submitting a request.

Optional Future Flow (Not Version 1\)

These are not required for MVP but may be added later.

• sharing resource bundles  
• church integrations  
• personalized recommendations  
• deeper AI-guided conversations

# Content Model

## **Content Model**

Version 1 uses a curated content library to provide spiritually helpful resources based on what a user is experiencing.

The app does not rely primarily on AI to generate spiritual content from scratch. Instead, AI is used to interpret the user’s message and identify relevant themes. The system then retrieves matching resources from a structured, tagged library.

### **Resource Types in Version 1**

The main resource types for Version 1 are:

* Scripture passages

* prayers

* devotional reflections

* songs

Mini-sermons are not a separate resource type in Version 1\. If existing mini-sermons are used, they should be adapted into shorter devotional reflections or linked as optional deeper-reading resources.

### **Scripture Strategy**

Scripture passages are stored as first-class resources in the content library rather than being chosen freely by AI at runtime.

This allows the app to:

* keep Scripture selection curated and biblically intentional

* reduce AI token usage and cost

* maintain consistency across similar requests

* avoid unnecessary copyright complications

Version 1 should use a public-domain Bible translation for quoted text, with the World English Bible as the preferred default.

### **Resource Structure**

Each resource should include a small set of core fields.

Common fields across resource types:

* id

* title

* resource type

* short summary

* content or content URL

* tags

* optional scripture references

* optional media URL

* published status

### **Resource Type Details**

**Scripture Passage**

* reference

* translation

* text

* tags

* short summary or note (optional)

**Prayer**

* title

* prayer text

* tags

* optional scripture references

* short summary

**Devotional Reflection**

* title

* reflection text or excerpt

* tags

* optional scripture references

* short summary

* optional full resource URL for longer reading

**Song**

* title

* short summary

* tags

* streaming URL

* optional lyrics excerpt

* optional artwork thumbnail

### **Tagging Model**

Resources should be tagged using a structured thematic system.

Suggested tag groupings:

**Emotions**

* anxiety

* fear

* grief

* shame

* loneliness

* discouragement

* frustration

**Themes**

* trust

* hope

* surrender

* identity in Christ

* God’s faithfulness

* comfort

* perseverance

**Situations**

* temptation

* uncertainty

* waiting

* conflict

* suffering

* spiritual dryness

These categories are mainly for organization and clarity. Under the hood, they may still be implemented as a unified tag system.

### **Response Model**

When a user submits a message, the AI identifies likely themes. The backend then retrieves matching resources from the content library and assembles a help bundle.

A help bundle may include:

* one or more Scripture passages

* one prayer

* one song

* one short devotional reflection

### **Content Length Guidance**

Version 1 should prioritize short, immediately helpful content.

* prayers should be concise

* devotional reflections should be brief and readable in one sitting

* songs should be easy to access and play

* longer sermons or teachings may be linked separately as optional deeper resources

The main in-app experience should focus on comfort, clarity, and encouragement rather than long-form reading.

If you want,

# Technical Architecture (Version 1\)

## **Technical Architecture V1**

Version 1 will be built as a web-first product with a shared backend architecture that can later support a mobile app.

The system should prioritize simplicity, maintainability, and low operating cost while leaving room for future expansion.

### **Architecture Goals**

* keep the first version lightweight and fast to build  
* reuse as much infrastructure as possible across future web and mobile clients  
* keep AI narrowly scoped to message interpretation  
* use curated content as the main source of truth  
* allow future expansion into admin tools, mobile app support, and richer personalization

---

### **Frontend (Version 1\)**

Version 1 will launch as a **responsive web application**.

The site should be designed mobile-first so it works well on phones and tablets, but it does not need full PWA support in the initial release.

Goals for the web frontend:

* simple and calm interface  
* mobile-friendly layout  
* easy access to the main help flow  
* clear display of returned resources  
* account access for saved items

Potential frontend stack:

* React  
* Vite  
* TypeScript  
* standard CSS solution already familiar to the project

The frontend will communicate with backend APIs for:

* AI theme interpretation  
* resource retrieval  
* account-based saved resources

---

### **Mobile App (Future)**

A mobile app is planned for a later phase, but not required for Version 1\.

The mobile app should reuse the same backend services and content system as the web version.

Potential future stack:

* React Native  
* Expo  
* TypeScript

This approach allows the web app to validate the product before investing in app-store distribution.

---

### **Backend**

The backend should remain in the Cloudflare ecosystem as much as practical.

Recommended backend responsibilities:

* receive user help requests  
* send user message to AI interpretation service  
* receive returned themes  
* query the content database for matching resources  
* assemble and return the help bundle  
* manage saved resources for signed-in users  
* expose APIs for frontend clients

Potential backend stack:

* Cloudflare Workers for API/backend logic

This avoids the need for a traditional always-on server and keeps deployment lightweight.

---

### **Database and Storage**

The project should use a **hybrid content model**.

#### **Database**

Use a structured database for:

* resource metadata  
* tags  
* relationships between resources and tags  
* saved user resources  
* account-related records if needed

Likely database choice:

* Cloudflare D1

#### **Object/File Storage**

Use file/object storage for:

* audio files  
* longer content files if needed  
* artwork/images

Likely storage choice:

* Cloudflare R2

This allows metadata to stay searchable while keeping media and longer-form assets in storage.

---

### **Content Source of Truth**

The source of truth should be hybrid:

* metadata, tags, summaries, and lookup fields live in the database  
* long-form text and media files may live in object storage when appropriate

Short content such as brief prayers or short reflections may be stored directly in the database for simplicity.

Longer resources may be stored externally and linked by URL.

---

### **AI Layer**

AI is used only for **theme interpretation**, not as the main source of spiritual content.

Responsibilities of the AI layer:

* analyze the user’s natural language message  
* identify emotional and spiritual themes  
* return structured theme output for resource lookup

Examples of themes:

* anxiety  
* grief  
* discouragement  
* helplessness  
* shame  
* temptation  
* uncertainty

The system should be designed in a **provider-agnostic** way so the model provider can be changed later without major frontend changes.

In practice, the frontend should never call the model directly. The backend should own all AI requests.

---

### **Authentication**

Authentication is optional for using the main help flow.

Users should be able to request help without logging in.

Authentication is primarily used for:

* saving resources  
* accessing saved items across devices  
* future personalization features

Recommended v1 behavior:

* guest users can ask for help immediately  
* when a guest clicks **Save**, they are prompted to sign up or sign in

Potential auth provider:

* Auth0

Auth0 is a reasonable choice because it can support both the web version and a future mobile app.

---

### **Saving Model**

In Version 1:

* help requests do not require an account  
* saving resources does require an account

This keeps the core experience frictionless while simplifying saved-resource persistence.

Saved data may include:

* saved scriptures  
* saved prayers  
* saved songs  
* saved reflections

---

### **Analytics**

Version 1 should include basic analytics to understand product usage.

Recommended analytics tool:

* Google Analytics

Important events to track:

* help request submitted  
* interpreted themes returned  
* resource opened  
* resource saved  
* sign-up flow started  
* sign-up completed

Analytics should help answer questions such as:

* which needs are most common  
* which resource types are used most  
* how many users are guests vs signed-in users  
* how often people save resources

---

### **Admin and Content Management**

Version 1 does not require a full admin dashboard.

Content can initially be managed manually through the database and storage layer.

However, the architecture should be designed so an admin interface can be added later without major restructuring.

Future admin capabilities may include:

* creating and editing resources  
* managing tags  
* publishing/unpublishing content  
* reviewing content quality  
* managing contributor content in later versions

---

### **High-Level Request Flow**

1. User opens web app  
2. User submits a message describing what they are going through  
3. Frontend sends request to backend  
4. Backend sends user message to AI interpretation service  
5. AI returns relevant themes  
6. Backend queries database for tagged resources matching those themes  
7. Backend assembles a help bundle  
8. Frontend displays scripture, prayer, song, and reflection  
9. If user clicks save, frontend prompts login if not authenticated  
10. Backend stores saved resource in the user account

---

### **Design Principles**

* web first, mobile later  
* Cloudflare-first infrastructure where practical  
* AI for interpretation, not primary content generation  
* curated content over improvised output  
* immediate guest access to help  
* account required only for persistent saving  
* architecture should stay simple enough to ship quickly

# Safety and Boundaries

## **Safety and Boundaries**

Version 1 is designed to provide **spiritual encouragement and guidance**, not professional mental health treatment or crisis intervention.

The app should consistently reflect a pastoral tone, pointing users toward God, Scripture, prayer, and worship, while maintaining clear boundaries about what it does and does not provide.

---

### **Core Purpose**

The app exists to:

* encourage users to turn toward God in difficult moments  
* provide Scripture, prayer, worship, and reflection  
* offer spiritual comfort and biblical perspective

The app does **not** exist to:

* diagnose mental health conditions  
* provide clinical or therapeutic treatment  
* replace licensed counseling or pastoral care

---

### **Positioning**

The app should be presented as:

**a spiritual support tool**  
not  
**a mental health or counseling service**

Language throughout the app should reflect this distinction.

---

### **AI Boundaries**

The AI system is limited to **interpreting user input into themes**.

It should not:

* give psychological diagnoses  
* provide therapeutic advice  
* present itself as a counselor  
* generate authoritative or directive life guidance

Instead, the AI supports the system by helping route users to **curated, biblically grounded resources**.

---

### **Content Boundaries**

All returned content should:

* align with Scripture  
* reflect a pastoral, encouraging tone  
* avoid harsh, condemning, or overly clinical language  
* focus on truth, hope, and drawing near to God

Content should be reviewed and curated to ensure consistency and biblical soundness.

---

### **Crisis Situations**

The app should recognize that some users may express serious distress.

Examples:

* suicidal thoughts  
* desire to harm themselves or others  
* extreme hopelessness

In these cases, the app should:

* avoid attempting to handle the situation on its own  
* clearly and gently encourage the user to seek immediate help  
* provide appropriate crisis resources (such as hotlines or emergency services)

Example response approach:

* acknowledge the user’s pain  
* encourage reaching out to a real person  
* provide a crisis support resource  
* avoid presenting the app as sufficient help in that moment

---

### **Messaging to Users**

The app should communicate clearly (likely in a footer or onboarding area):

* it is not a substitute for professional care  
* it is intended as spiritual encouragement  
* additional help may be needed in some situations

This messaging should be present but not intrusive.

---

### **Access Philosophy**

The app should prioritize **immediate access to help**.

* users should not be required to log in to receive encouragement  
* no paywall should block initial help  
* friction should be minimized for users in distress

Safeguards (such as rate limits) may exist behind the scenes but should not interfere with the core experience.

---

### **Tone and Pastoral Approach**

The overall tone of the app should be:

* gentle  
* compassionate  
* grounded in truth  
* encouraging toward God

Different situations may call for slightly different tones (comfort, encouragement, exhortation), but all should remain pastoral and rooted in Scripture.

---

### **Future Considerations**

As the app evolves, additional safeguards may be introduced, including:

* improved detection of crisis situations  
* curated resource recommendations for serious struggles  
* partnerships with ministries or counseling services

These should always reinforce the app’s role as **support**, not replacement.

# Data Schema

Data Schema

## **Recommended storage split**

Use **D1** for:

* users  
* resources  
* scripture passages  
* tags  
* resource-to-tag joins  
* saved resources  
* optional analytics/event rows if you want lightweight internal tracking later

Use **R2** for:

* MP3 files  
* artwork images  
* long-form markdown or JSON files if you decide not to store full text in D1

Use **Auth0** for auth, since it supports both web and native app flows, which keeps your later app path open. ([Auth0](https://auth0.com/docs/get-started/auth0-overview/create-applications/native-apps?utm_source=chatgpt.com))

## **Core schema**

### **1\) users**

You may not need a full user profile at first if Auth0 is the source of truth, but I still recommend a local users table.

CREATE TABLE users (  
  id TEXT PRIMARY KEY,                \-- internal UUID  
  auth0\_user\_id TEXT UNIQUE NOT NULL, \-- Auth0 subject  
  email TEXT,  
  display\_name TEXT,  
  faith\_status TEXT,                  \-- optional: believer, seeker, unknown  
  created\_at TEXT NOT NULL,  
  updated\_at TEXT NOT NULL  
);

Why keep this table:

* easier joins for saved resources  
* room for light profile data later  
* you avoid coupling everything directly to Auth0 IDs

### **2\) resources**

This is the main table.

CREATE TABLE resources (  
  id TEXT PRIMARY KEY,  
  type TEXT NOT NULL,                 \-- scripture, prayer, reflection, song  
  slug TEXT UNIQUE NOT NULL,  
  title TEXT NOT NULL,  
  short\_summary TEXT,  
  body\_text TEXT,                     \-- for shorter prayers/reflections/scripture text  
  content\_url TEXT,                   \-- for longer external content or web page  
  media\_url TEXT,                     \-- MP3/audio URL, usually R2 or your existing site  
  image\_url TEXT,                     \-- artwork/thumbnail  
  scripture\_reference TEXT,           \-- quick access, optional  
  scripture\_translation TEXT,         \-- e.g. WEB  
  status TEXT NOT NULL DEFAULT 'draft', \-- draft, published, archived  
  source\_kind TEXT NOT NULL DEFAULT 'internal', \-- internal, external  
  created\_at TEXT NOT NULL,  
  updated\_at TEXT NOT NULL  
);

Notes:

* `body_text` is for short content you want to return immediately.  
* `content_url` is for longer pages or full resources.  
* `media_url` handles songs and later audio scripture if you want it.  
* `type` should stay constrained in app logic.

### **3\) tags**

Single unified tag table, with category.

CREATE TABLE tags (  
  id TEXT PRIMARY KEY,  
  name TEXT NOT NULL UNIQUE,          \-- anxiety, hope, temptation  
  category TEXT NOT NULL,             \-- emotion, theme, situation  
  created\_at TEXT NOT NULL  
);

This gives you the clean organization you wanted without overcomplicating the schema.

### **4\) resource\_tags**

Join table for many-to-many.

CREATE TABLE resource\_tags (  
  resource\_id TEXT NOT NULL,  
  tag\_id TEXT NOT NULL,  
  PRIMARY KEY (resource\_id, tag\_id),  
  FOREIGN KEY (resource\_id) REFERENCES resources(id) ON DELETE CASCADE,  
  FOREIGN KEY (tag\_id) REFERENCES tags(id) ON DELETE CASCADE  
);

This is the heart of retrieval.

### **5\) saved\_resources**

Since you decided save should prompt login, this can stay simple.

CREATE TABLE saved\_resources (  
  id TEXT PRIMARY KEY,  
  user\_id TEXT NOT NULL,  
  resource\_id TEXT NOT NULL,  
  created\_at TEXT NOT NULL,  
  UNIQUE (user\_id, resource\_id),  
  FOREIGN KEY (user\_id) REFERENCES users(id) ON DELETE CASCADE,  
  FOREIGN KEY (resource\_id) REFERENCES resources(id) ON DELETE CASCADE  
);

### **6\) help\_requests**

I strongly recommend storing lightweight request history, even in v1, if only for debugging and learning.

CREATE TABLE help\_requests (  
  id TEXT PRIMARY KEY,  
  user\_id TEXT,                       \-- nullable for guests  
  session\_id TEXT,                    \-- guest/session tracking  
  raw\_input TEXT NOT NULL,  
  normalized\_summary TEXT,            \-- optional short backend summary  
  created\_at TEXT NOT NULL,  
  FOREIGN KEY (user\_id) REFERENCES users(id) ON DELETE SET NULL  
);

You do **not** need to store everything forever, but having this table helps you understand usage and improve matching.

### **7\) help\_request\_tags**

Store what the AI returned.

CREATE TABLE help\_request\_tags (  
  help\_request\_id TEXT NOT NULL,  
  tag\_id TEXT NOT NULL,  
  confidence REAL,                    \-- optional  
  PRIMARY KEY (help\_request\_id, tag\_id),  
  FOREIGN KEY (help\_request\_id) REFERENCES help\_requests(id) ON DELETE CASCADE,  
  FOREIGN KEY (tag\_id) REFERENCES tags(id) ON DELETE CASCADE  
);

This is very useful later for analytics like “what themes show up most?”

### **8\) help\_request\_resources**

Store what was actually shown to the user.

CREATE TABLE help\_request\_resources (  
  help\_request\_id TEXT NOT NULL,  
  resource\_id TEXT NOT NULL,  
  slot TEXT NOT NULL,                 \-- scripture, prayer, reflection, song  
  rank\_order INTEGER NOT NULL DEFAULT 0,  
  PRIMARY KEY (help\_request\_id, resource\_id, slot),  
  FOREIGN KEY (help\_request\_id) REFERENCES help\_requests(id) ON DELETE CASCADE,  
  FOREIGN KEY (resource\_id) REFERENCES resources(id) ON DELETE CASCADE  
);

This lets you answer:

* what resources are shown most  
* what gets saved after being shown  
* what matching logic seems to work

## **Scripture handling recommendation**

I recommend that Scripture be stored as normal `resources` rows with `type = 'scripture'`, not as a separate complicated schema at first.

That means one row might be:

* title: Psalm 121:1–2  
* body\_text: WEB passage text  
* scripture\_reference: Psalm 121:1-2  
* scripture\_translation: WEB  
* tags: helplessness, trust, help, discouragement

That is the simplest path and gives you the control you wanted.

If later you decide to build a broader Bible subsystem, then you can add a dedicated table such as:

CREATE TABLE scripture\_passages (  
  id TEXT PRIMARY KEY,  
  book TEXT NOT NULL,  
  chapter\_start INTEGER NOT NULL,  
  verse\_start INTEGER NOT NULL,  
  chapter\_end INTEGER,  
  verse\_end INTEGER,  
  translation TEXT NOT NULL,  
  text TEXT NOT NULL,  
  created\_at TEXT NOT NULL  
);

But for v1, I would skip that. Simpler is better.

## **Minimal indexes**

You’ll want a few indexes early.

CREATE INDEX idx\_resources\_type ON resources(type);  
CREATE INDEX idx\_resources\_status ON resources(status);  
CREATE INDEX idx\_tags\_category ON tags(category);  
CREATE INDEX idx\_saved\_resources\_user\_id ON saved\_resources(user\_id);  
CREATE INDEX idx\_help\_requests\_user\_id ON help\_requests(user\_id);  
CREATE INDEX idx\_help\_requests\_session\_id ON help\_requests(session\_id);

And if you expect lots of tag-based lookups:

CREATE INDEX idx\_resource\_tags\_tag\_id ON resource\_tags(tag\_id);  
CREATE INDEX idx\_resource\_tags\_resource\_id ON resource\_tags(resource\_id);

## **Example retrieval pattern**

The AI returns tags like:

* frustration  
* helplessness  
* discouragement

Then your backend:

1. looks up those tag IDs  
2. finds matching resources through `resource_tags`  
3. filters to `status = 'published'`  
4. groups by `type`  
5. picks one or more per slot

That’s exactly the kind of structured query D1 is meant to support through Workers. ([Cloudflare Docs](https://developers.cloudflare.com/d1/get-started/?utm_source=chatgpt.com))

## **What to keep out of v1**

I would **not** add these tables yet:

* contributor submissions  
* church organizations  
* church-specific resource prioritization  
* subscriptions/payments  
* share bundles  
* moderation queues  
* detailed personalization profiles

Those are all reasonable later, but they would just bloat your first schema.

## **When MongoDB would make sense later**

If you still want MongoDB in the picture, I’d reserve it for a future use case like:

* flexible admin drafts with changing shapes  
* large imported church sermon metadata from many sources  
* experimental AI prompt/result archives  
* document-heavy contributor workflows

But for the actual app core, D1 is the cleaner choice.

## **My recommended v1 schema set**

Build these first:

* `users`  
* `resources`  
* `tags`  
* `resource_tags`  
* `saved_resources`  
* `help_requests`  
* `help_request_tags`  
* `help_request_resources`

That gives you enough for:

* login  
* content library  
* AI-assisted matching  
* save feature  
* basic analytics and debugging

If you want, next I can turn this into a **copy-paste D1 SQL migration file** with all tables, indexes, and a little sample seed data.

# migrations/001\_initial\_schema.sql

PRAGMA foreign\_keys \= ON;

\-- \=========================  
\-- USERS  
\-- \=========================  
CREATE TABLE IF NOT EXISTS users (  
  id TEXT PRIMARY KEY,                  \-- internal UUID  
  auth0\_user\_id TEXT NOT NULL UNIQUE,   \-- Auth0 subject / sub  
  email TEXT,  
  display\_name TEXT,  
  faith\_status TEXT CHECK (  
    faith\_status IN ('believer', 'seeker', 'unknown')  
  ) DEFAULT 'unknown',  
  created\_at TEXT NOT NULL,  
  updated\_at TEXT NOT NULL  
);

\-- \=========================  
\-- RESOURCES  
\-- \=========================  
CREATE TABLE IF NOT EXISTS resources (  
  id TEXT PRIMARY KEY,  
  type TEXT NOT NULL CHECK (  
    type IN ('scripture', 'prayer', 'reflection', 'song')  
  ),  
  slug TEXT NOT NULL UNIQUE,  
  title TEXT NOT NULL,  
  short\_summary TEXT,  
  body\_text TEXT,                       \-- short text content for immediate display  
  content\_url TEXT,                     \-- long-form content page/file URL  
  media\_url TEXT,                       \-- MP3/audio URL  
  image\_url TEXT,                       \-- artwork/thumbnail URL  
  scripture\_reference TEXT,             \-- e.g. Psalm 121:1-2  
  scripture\_translation TEXT,           \-- e.g. WEB  
  status TEXT NOT NULL DEFAULT 'draft' CHECK (  
    status IN ('draft', 'published', 'archived')  
  ),  
  source\_kind TEXT NOT NULL DEFAULT 'internal' CHECK (  
    source\_kind IN ('internal', 'external')  
  ),  
  created\_at TEXT NOT NULL,  
  updated\_at TEXT NOT NULL  
);

\-- \=========================  
\-- TAGS  
\-- \=========================  
CREATE TABLE IF NOT EXISTS tags (  
  id TEXT PRIMARY KEY,  
  name TEXT NOT NULL UNIQUE,  
  category TEXT NOT NULL CHECK (  
    category IN ('emotion', 'theme', 'situation')  
  ),  
  created\_at TEXT NOT NULL  
);

\-- \=========================  
\-- RESOURCE\_TAGS  
\-- \=========================  
CREATE TABLE IF NOT EXISTS resource\_tags (  
  resource\_id TEXT NOT NULL,  
  tag\_id TEXT NOT NULL,  
  PRIMARY KEY (resource\_id, tag\_id),  
  FOREIGN KEY (resource\_id) REFERENCES resources(id) ON DELETE CASCADE,  
  FOREIGN KEY (tag\_id) REFERENCES tags(id) ON DELETE CASCADE  
);

\-- \=========================  
\-- SAVED\_RESOURCES  
\-- \=========================  
CREATE TABLE IF NOT EXISTS saved\_resources (  
  id TEXT PRIMARY KEY,  
  user\_id TEXT NOT NULL,  
  resource\_id TEXT NOT NULL,  
  created\_at TEXT NOT NULL,  
  UNIQUE (user\_id, resource\_id),  
  FOREIGN KEY (user\_id) REFERENCES users(id) ON DELETE CASCADE,  
  FOREIGN KEY (resource\_id) REFERENCES resources(id) ON DELETE CASCADE  
);

\-- \=========================  
\-- HELP\_REQUESTS  
\-- \=========================  
CREATE TABLE IF NOT EXISTS help\_requests (  
  id TEXT PRIMARY KEY,  
  user\_id TEXT,                         \-- nullable for guests  
  session\_id TEXT,                      \-- guest/session tracking  
  raw\_input TEXT NOT NULL,  
  normalized\_summary TEXT,  
  created\_at TEXT NOT NULL,  
  FOREIGN KEY (user\_id) REFERENCES users(id) ON DELETE SET NULL  
);

\-- \=========================  
\-- HELP\_REQUEST\_TAGS  
\-- \=========================  
CREATE TABLE IF NOT EXISTS help\_request\_tags (  
  help\_request\_id TEXT NOT NULL,  
  tag\_id TEXT NOT NULL,  
  confidence REAL,  
  PRIMARY KEY (help\_request\_id, tag\_id),  
  FOREIGN KEY (help\_request\_id) REFERENCES help\_requests(id) ON DELETE CASCADE,  
  FOREIGN KEY (tag\_id) REFERENCES tags(id) ON DELETE CASCADE  
);

\-- \=========================  
\-- HELP\_REQUEST\_RESOURCES  
\-- \=========================  
CREATE TABLE IF NOT EXISTS help\_request\_resources (  
  help\_request\_id TEXT NOT NULL,  
  resource\_id TEXT NOT NULL,  
  slot TEXT NOT NULL CHECK (  
    slot IN ('scripture', 'prayer', 'reflection', 'song')  
  ),  
  rank\_order INTEGER NOT NULL DEFAULT 0,  
  PRIMARY KEY (help\_request\_id, resource\_id, slot),  
  FOREIGN KEY (help\_request\_id) REFERENCES help\_requests(id) ON DELETE CASCADE,  
  FOREIGN KEY (resource\_id) REFERENCES resources(id) ON DELETE CASCADE  
);

\-- \=========================  
\-- INDEXES  
\-- \=========================  
CREATE INDEX IF NOT EXISTS idx\_users\_auth0\_user\_id  
  ON users(auth0\_user\_id);

CREATE INDEX IF NOT EXISTS idx\_users\_email  
  ON users(email);

CREATE INDEX IF NOT EXISTS idx\_resources\_type  
  ON resources(type);

CREATE INDEX IF NOT EXISTS idx\_resources\_status  
  ON resources(status);

CREATE INDEX IF NOT EXISTS idx\_resources\_slug  
  ON resources(slug);

CREATE INDEX IF NOT EXISTS idx\_tags\_category  
  ON tags(category);

CREATE INDEX IF NOT EXISTS idx\_tags\_name  
  ON tags(name);

CREATE INDEX IF NOT EXISTS idx\_resource\_tags\_tag\_id  
  ON resource\_tags(tag\_id);

CREATE INDEX IF NOT EXISTS idx\_resource\_tags\_resource\_id  
  ON resource\_tags(resource\_id);

CREATE INDEX IF NOT EXISTS idx\_saved\_resources\_user\_id  
  ON saved\_resources(user\_id);

CREATE INDEX IF NOT EXISTS idx\_saved\_resources\_resource\_id  
  ON saved\_resources(resource\_id);

CREATE INDEX IF NOT EXISTS idx\_help\_requests\_user\_id  
  ON help\_requests(user\_id);

CREATE INDEX IF NOT EXISTS idx\_help\_requests\_session\_id  
  ON help\_requests(session\_id);

CREATE INDEX IF NOT EXISTS idx\_help\_requests\_created\_at  
  ON help\_requests(created\_at);

CREATE INDEX IF NOT EXISTS idx\_help\_request\_tags\_tag\_id  
  ON help\_request\_tags(tag\_id);

CREATE INDEX IF NOT EXISTS idx\_help\_request\_resources\_resource\_id  
  ON help\_request\_resources(resource\_id);

CREATE INDEX IF NOT EXISTS idx\_help\_request\_resources\_slot  
  ON help\_request\_resources(slot);

\-- \=========================  
\-- STARTER TAGS  
\-- \=========================  
INSERT OR IGNORE INTO tags (id, name, category, created\_at) VALUES  
  \-- Emotions  
  ('tag\_emotion\_anxiety',        'anxiety',         'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_fear',           'fear',            'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_grief',          'grief',           'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_shame',          'shame',           'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_loneliness',     'loneliness',      'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_discouragement', 'discouragement',  'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_frustration',    'frustration',     'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_helplessness',   'helplessness',    'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_overwhelm',      'overwhelm',       'emotion',   CURRENT\_TIMESTAMP),  
  ('tag\_emotion\_confusion',      'confusion',       'emotion',   CURRENT\_TIMESTAMP),

  \-- Themes  
  ('tag\_theme\_trust',            'trust',               'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_hope',             'hope',                'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_surrender',        'surrender',           'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_comfort',          'comfort',             'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_peace',            'peace',               'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_perseverance',     'perseverance',        'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_gods\_faithfulness','God''s faithfulness', 'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_identity',         'identity in Christ',  'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_help',             'help',                'theme', CURRENT\_TIMESTAMP),  
  ('tag\_theme\_guidance',         'guidance',            'theme', CURRENT\_TIMESTAMP),

  \-- Situations  
  ('tag\_situation\_temptation',       'temptation',       'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_uncertainty',      'uncertainty',      'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_waiting',          'waiting',          'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_conflict',         'conflict',         'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_suffering',        'suffering',        'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_spiritual\_dryness','spiritual dryness','situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_directionless',    'directionless',    'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_doubt',            'doubt',            'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_pain',             'pain',             'situation', CURRENT\_TIMESTAMP),  
  ('tag\_situation\_loss',             'loss',             'situation', CURRENT\_TIMESTAMP);

# src/types/index.ts

// \=========================  
// Core enums / unions  
// \=========================

export type ResourceType \= "scripture" | "prayer" | "reflection" | "song";

export type ResourceStatus \= "draft" | "published" | "archived";

export type SourceKind \= "internal" | "external";

export type TagCategory \= "emotion" | "theme" | "situation";

export type FaithStatus \= "believer" | "seeker" | "unknown";

export type HelpBundleSlot \= "scripture" | "prayer" | "reflection" | "song";

// \=========================  
// Database row types  
// \=========================

export interface UserRow {  
  id: string;  
  auth0\_user\_id: string;  
  email: string | null;  
  display\_name: string | null;  
  faith\_status: FaithStatus;  
  created\_at: string;  
  updated\_at: string;  
}

export interface ResourceRow {  
  id: string;  
  type: ResourceType;  
  slug: string;  
  title: string;  
  short\_summary: string | null;  
  body\_text: string | null;  
  content\_url: string | null;  
  media\_url: string | null;  
  image\_url: string | null;  
  scripture\_reference: string | null;  
  scripture\_translation: string | null;  
  status: ResourceStatus;  
  source\_kind: SourceKind;  
  created\_at: string;  
  updated\_at: string;  
}

export interface TagRow {  
  id: string;  
  name: string;  
  category: TagCategory;  
  created\_at: string;  
}

export interface ResourceTagRow {  
  resource\_id: string;  
  tag\_id: string;  
}

export interface SavedResourceRow {  
  id: string;  
  user\_id: string;  
  resource\_id: string;  
  created\_at: string;  
}

export interface HelpRequestRow {  
  id: string;  
  user\_id: string | null;  
  session\_id: string | null;  
  raw\_input: string;  
  normalized\_summary: string | null;  
  created\_at: string;  
}

export interface HelpRequestTagRow {  
  help\_request\_id: string;  
  tag\_id: string;  
  confidence: number | null;  
}

export interface HelpRequestResourceRow {  
  help\_request\_id: string;  
  resource\_id: string;  
  slot: HelpBundleSlot;  
  rank\_order: number;  
}

// \=========================  
// Rich app/domain models  
// \=========================

export interface Tag {  
  id: string;  
  name: string;  
  category: TagCategory;  
}

export interface Resource {  
  id: string;  
  type: ResourceType;  
  slug: string;  
  title: string;  
  shortSummary: string | null;  
  bodyText: string | null;  
  contentUrl: string | null;  
  mediaUrl: string | null;  
  imageUrl: string | null;  
  scriptureReference: string | null;  
  scriptureTranslation: string | null;  
  status: ResourceStatus;  
  sourceKind: SourceKind;  
  tags: Tag\[\];  
  createdAt: string;  
  updatedAt: string;  
}

export interface SavedResource {  
  id: string;  
  userId: string;  
  resourceId: string;  
  createdAt: string;  
  resource?: Resource;  
}

export interface HelpRequest {  
  id: string;  
  userId: string | null;  
  sessionId: string | null;  
  rawInput: string;  
  normalizedSummary: string | null;  
  createdAt: string;  
  tags?: HelpRequestTag\[\];  
  resources?: HelpRequestResource\[\];  
}

export interface HelpRequestTag {  
  helpRequestId: string;  
  tagId: string;  
  confidence: number | null;  
  tag?: Tag;  
}

export interface HelpRequestResource {  
  helpRequestId: string;  
  resourceId: string;  
  slot: HelpBundleSlot;  
  rankOrder: number;  
  resource?: Resource;  
}

// \=========================  
// AI interpretation types  
// \=========================

export interface InterpretedTheme {  
  tagName: string;  
  confidence?: number;  
}

export interface AIInterpretationResult {  
  themes: InterpretedTheme\[\];  
  normalizedSummary?: string;  
}

// \=========================  
// Help bundle types  
// \=========================

export interface HelpBundle {  
  helpRequestId: string;  
  summary: string | null;  
  matchedThemes: Tag\[\];  
  scripture: Resource\[\];  
  prayer: Resource\[\];  
  reflection: Resource\[\];  
  song: Resource\[\];  
}

export interface HelpBundleSlotMap {  
  scripture: Resource\[\];  
  prayer: Resource\[\];  
  reflection: Resource\[\];  
  song: Resource\[\];  
}

// \=========================  
// API request / response types  
// \=========================

export interface SubmitHelpRequestBody {  
  input: string;  
  sessionId?: string;  
}

export interface SubmitHelpResponse {  
  helpRequestId: string;  
  bundle: HelpBundle;  
}

export interface SaveResourceRequestBody {  
  resourceId: string;  
}

export interface SaveResourceResponse {  
  success: true;  
  savedResourceId: string;  
}

export interface RemoveSavedResourceResponse {  
  success: true;  
}

export interface GetSavedResourcesResponse {  
  items: SavedResource\[\];  
}

export interface GetResourceResponse {  
  resource: Resource;  
}

export interface GetTagsResponse {  
  tags: Tag\[\];  
}

// \=========================  
// Auth / session-adjacent types  
// \=========================

export interface CurrentUser {  
  id: string;  
  email: string | null;  
  displayName: string | null;  
  faithStatus: FaithStatus;  
}

export interface AuthenticatedRequestContext {  
  user: CurrentUser | null;  
  sessionId: string | null;  
}

// \=========================  
// Admin-friendly input types  
// \=========================

export interface CreateResourceInput {  
  type: ResourceType;  
  slug: string;  
  title: string;  
  shortSummary?: string | null;  
  bodyText?: string | null;  
  contentUrl?: string | null;  
  mediaUrl?: string | null;  
  imageUrl?: string | null;  
  scriptureReference?: string | null;  
  scriptureTranslation?: string | null;  
  status?: ResourceStatus;  
  sourceKind?: SourceKind;  
  tagIds?: string\[\];  
}

export interface UpdateResourceInput {  
  title?: string;  
  shortSummary?: string | null;  
  bodyText?: string | null;  
  contentUrl?: string | null;  
  mediaUrl?: string | null;  
  imageUrl?: string | null;  
  scriptureReference?: string | null;  
  scriptureTranslation?: string | null;  
  status?: ResourceStatus;  
  sourceKind?: SourceKind;  
  tagIds?: string\[\];  
}

export interface CreateTagInput {  
  name: string;  
  category: TagCategory;  
}

// \=========================  
// Utility mapper helpers  
// \=========================

export function mapResourceRowToResource(  
  row: ResourceRow,  
  tags: Tag\[\] \= \[\],  
): Resource {  
  return {  
    id: row.id,  
    type: row.type,  
    slug: row.slug,  
    title: row.title,  
    shortSummary: row.short\_summary,  
    bodyText: row.body\_text,  
    contentUrl: row.content\_url,  
    mediaUrl: row.media\_url,  
    imageUrl: row.image\_url,  
    scriptureReference: row.scripture\_reference,  
    scriptureTranslation: row.scripture\_translation,  
    status: row.status,  
    sourceKind: row.source\_kind,  
    tags,  
    createdAt: row.created\_at,  
    updatedAt: row.updated\_at,  
  };  
}

export function mapTagRowToTag(row: TagRow): Tag {  
  return {  
    id: row.id,  
    name: row.name,  
    category: row.category,  
  };  
}

export function mapUserRowToCurrentUser(row: UserRow): CurrentUser {  
  return {  
    id: row.id,  
    email: row.email,  
    displayName: row.display\_name,  
    faithStatus: row.faith\_status,  
  };  
}

# API Routes (Version 1\)

## **API Routes V1**

### **Design goals**

The API should stay small and focused in v1.

It mainly needs to support:

* submitting a help request  
* retrieving curated resources  
* saving resources for logged-in users  
* loading saved resources  
* retrieving individual resources if needed  
* light auth-related user syncing

The frontend should never call the AI provider directly. All AI interaction should go through the backend.

---

# **1\. Submit Help Request**

## **`POST /api/help`**

This is the main route of the entire app.

The user submits a natural-language description of what they are going through. The backend interprets it, finds matching resources, stores the request, and returns a help bundle.

### **Auth required**

No

### **Request body**

interface SubmitHelpRequestBody {  
  input: string;  
  sessionId?: string;  
}

### **Example request**

{  
  "input": "I feel frustrated and helpless and don't know what to do",  
  "sessionId": "guest-session-123"  
}

### **Backend responsibilities**

* validate input  
* send input to AI interpretation service  
* receive returned themes  
* create a `help_requests` row  
* create `help_request_tags` rows  
* find matching published resources  
* choose resources by slot:  
  * scripture  
  * prayer  
  * reflection  
  * song  
* create `help_request_resources` rows  
* return assembled help bundle

### **Response**

interface SubmitHelpResponse {  
  helpRequestId: string;  
  bundle: HelpBundle;  
}

---

# **2\. Get Saved Resources**

## **`GET /api/saved-resources`**

Returns all resources the logged-in user has saved.

### **Auth required**

Yes

### **Request body**

None

### **Backend responsibilities**

* verify user auth  
* find local user record by Auth0 ID  
* fetch saved resources  
* join to resource metadata and tags  
* return saved library

### **Response**

interface GetSavedResourcesResponse {  
  items: SavedResource\[\];  
}

---

# **3\. Save a Resource**

## **`POST /api/saved-resources`**

Saves a resource to the logged-in user’s library.

### **Auth required**

Yes

### **Request body**

interface SaveResourceRequestBody {  
  resourceId: string;  
}

### **Example request**

{  
  "resourceId": "res\_song\_my\_help"  
}

### **Backend responsibilities**

* verify user auth  
* resolve or create local user record  
* validate that resource exists and is published  
* create saved resource row  
* ignore duplicates safely

### **Response**

interface SaveResourceResponse {  
  success: true;  
  savedResourceId: string;  
}

### **Notes**

If the user is not logged in, the frontend should not call this route. It should first prompt sign-in.

---

# **4\. Remove a Saved Resource**

## **`DELETE /api/saved-resources/:resourceId`**

Removes a saved resource from the user’s library.

### **Auth required**

Yes

### **Route params**

* `resourceId`

### **Backend responsibilities**

* verify user auth  
* delete matching saved resource row for that user

### **Response**

interface RemoveSavedResourceResponse {  
  success: true;  
}

---

# **5\. Get a Single Resource**

## **`GET /api/resources/:slug`**

Returns the full details for one resource.

This is useful when a user clicks into a devotional, prayer, or scripture resource page.

### **Auth required**

No

### **Route params**

* `slug`

### **Backend responsibilities**

* find published resource by slug  
* fetch associated tags  
* return normalized resource

### **Response**

interface GetResourceResponse {  
  resource: Resource;  
}

---

# **6\. Browse Resources**

## **`GET /api/resources`**

Returns a list of published resources, optionally filtered.

This supports browse/explore pages and may also help later with search.

### **Auth required**

No

### **Query params (optional)**

* `type`  
* `tag`  
* `limit`  
* `offset`

### **Example**

`GET /api/resources?type=reflection&tag=anxiety&limit=10`

### **Backend responsibilities**

* validate filters  
* query published resources  
* optionally join tags  
* return paginated list

### **Suggested response**

interface GetResourcesResponse {  
  items: Resource\[\];  
  total: number;  
  limit: number;  
  offset: number;  
}

---

# **7\. Get Tags**

## **`GET /api/tags`**

Returns available tags.

This is mainly useful for development, browse UI, and future admin tooling.

### **Auth required**

No

### **Response**

interface GetTagsResponse {  
  tags: Tag\[\];  
}

---

# **8\. Sync Authenticated User**

## **`POST /api/me/sync`**

This route creates or updates the local `users` table entry for an authenticated user.

This is helpful because Auth0 is the identity provider, but your app still wants a local user record.

### **Auth required**

Yes

### **Request body**

Could be empty, or optionally allow lightweight profile fields like:

interface SyncUserRequestBody {  
  displayName?: string;  
  faithStatus?: FaithStatus;  
}

### **Backend responsibilities**

* verify Auth0 user  
* upsert local user row using:  
  * Auth0 subject  
  * email  
  * display name  
* optionally store faith status if you decide to collect it later

### **Response**

interface SyncUserResponse {  
  user: CurrentUser;  
}

---

# **9\. Get Current User**

## **`GET /api/me`**

Returns the authenticated user’s app profile.

### **Auth required**

Yes

### **Response**

interface GetCurrentUserResponse {  
  user: CurrentUser;  
}  
---

## **Optional v1.5 Routes**

These are not necessary for the first build, but worth keeping in mind.

### **`POST /api/share`**

Create a shareable bundle or share token.

### **`GET /api/shared/:token`**

Load a shared bundle in browser without login.

### **`POST /api/analytics/event`**

Custom event tracking for possible later internal event logging in addition to Google Analytics.

---

## **Route Summary**

For v1 minimum set is:

* `POST /api/help`  
* `GET /api/saved-resources`  
* `POST /api/saved-resources`  
* `DELETE /api/saved-resources/:resourceId`  
* `GET /api/resources/:slug`  
* `GET /api/resources`  
* `POST /api/me/sync`  
* `GET /api/me`

---

## **Suggested backend folder structure**

Since you’re likely using Cloudflare Workers, I’d organize backend code roughly like this:

src/  
  routes/  
    help.ts  
    resources.ts  
    savedResources.ts  
    me.ts  
    health.ts  
  services/  
    aiInterpreter.ts  
    resourceMatcher.ts  
    userService.ts  
    savedResourceService.ts  
  db/  
    client.ts  
    queries/  
      resources.ts  
      tags.ts  
      users.ts  
      helpRequests.ts  
      savedResources.ts  
  types/  
    api.ts  
    db.ts

The main thing is to keep route handlers thin and put real logic into services.

---

## **Recommended behavior for `/api/help`**

This route is important enough that I’d define its internal steps explicitly:

1. validate input length and required fields  
2. normalize or trim input  
3. send message to AI interpreter  
4. map returned theme names to existing tag rows  
5. create `help_requests` record  
6. create `help_request_tags` rows  
7. fetch candidate resources by tags  
8. rank and choose resources per slot  
9. create `help_request_resources` rows  
10. return help bundle

# Resource Matching Logic (Version 1\)

## **Resource Matching Logic V1**

Version 1 uses a simple, controllable matching system to connect user needs with curated resources.

The system should prioritize relevance, clarity, and pastoral usefulness over complexity.

AI is used only to interpret the user’s message into themes. The backend is responsible for selecting the final resources.

### **Goal of Matching**

When a user submits a message, the app should return a focused help bundle that feels relevant and supportive.

The target response structure for Version 1 is:

* 2 to 3 Scripture passages  
* 1 prayer  
* 1 reflection  
* 1 song

Scripture is the highest-priority resource type and should always be returned if possible.

Prayer and reflection should normally be returned.

Song should be returned when there is a reasonably strong match.

---

### **Step 1: AI Theme Interpretation**

The AI analyzes the user’s input and returns a small set of normalized tags.

The ideal output is:

* 1 primary tag  
* 1 to 3 secondary tags

Example:

User input:  
“I feel frustrated and helpless and don’t know what to do.”

AI interpretation:

* primary: helplessness  
* secondary: frustration, discouragement, uncertainty

The AI does not choose final resources.

---

### **Step 2: Candidate Resource Lookup**

The backend retrieves published resources that match one or more of the interpreted tags.

Resources are considered separately by slot:

* Scripture  
* prayer  
* reflection  
* song

Only published resources are eligible.

---

### **Step 3: Resource Scoring**

Each candidate resource receives a score based on how well it matches the interpreted tags.

Suggested scoring principles:

* base score for each matched tag  
* bonus if the resource matches multiple returned tags  
* bonus if the resource matches the primary tag  
* optional small bonus for manually prioritized resources  
* small penalty if the resource was shown very recently to the same user/session

This makes the system deterministic and easy to improve.

---

### **Step 4: Slot Prioritization**

Each slot should be matched slightly differently.

#### **Scripture**

Scripture should prioritize theological and emotional precision.

It should strongly reflect the core need and point the user toward God’s truth.

Scripture is required whenever possible.

The app should return 2 to 3 Scripture passages.

#### **Prayer**

Prayer should prioritize emotional fit and immediate usefulness.

The selected prayer should feel natural for the user to pray in their current situation.

The app should return 1 prayer.

#### **Reflection**

Reflection should prioritize practical encouragement and pastoral clarity.

It should be short, readable, and directly relevant.

The app should return 1 reflection.

#### **Song**

Song should prioritize emotional resonance and spiritual direction.

It should help the user turn toward God in worship, trust, surrender, or comfort.

The app should return 1 song when a strong enough match exists.

---

### **Step 5: Repetition Control**

The system should avoid repeating the same resources too frequently for the same user.

Version 1 uses a light repetition penalty rather than hard blocking.

#### **Logged-in users**

For logged-in users, the backend may look at the most recent help bundles or recently shown resources and apply a small penalty to resources that appeared very recently.

Suggested v1 behavior:

* small penalty if shown within the user’s last 3 help bundles  
* slightly larger penalty if shown in the immediately previous bundle

#### **Guest users**

For guest users, repetition control may use the current session ID if available.

If no session history is available, repetition control may be skipped.

A strong match may still be returned again if it is clearly the best resource.

The goal is freshness, not forced variety.

---

### **Step 6: Final Bundle Selection**

After scoring candidates, the backend selects the top resource(s) for each slot:

* top 2 to 3 Scripture passages  
* top prayer  
* top reflection  
* top song

The selected resources are stored in `help_request_resources` for traceability and future analytics.

---

### **Matching Principles**

Version 1 should follow these principles:

* curated content over generated content  
* Scripture first  
* focused results over too many options  
* deterministic and explainable matching  
* light freshness control without overcomplication  
* pastoral usefulness over algorithmic cleverness

---

### **Fallback Behavior**

If a strong slot-specific match is not found, the system should fall back to broadly relevant published resources.

Fallbacks should exist especially for common needs such as:

* anxiety  
* discouragement  
* helplessness  
* uncertainty  
* grief

This helps ensure the app always returns something useful.

---

### **Content Tagging Guidance**

Matching quality depends on good tagging.

For Version 1:

* keep tag vocabulary fairly tight  
* prefer clear emotional and situational tags  
* avoid over-tagging resources  
* aim for 3 to 6 meaningful tags per resource

A smaller, cleaner tag system is better than a large, messy one.

# AI Interpretation Contract (Version 1\)

## **AI Interpretation Contract V1**

The AI layer is responsible only for interpreting a user’s natural-language message into a small set of approved tags.

It is not responsible for choosing final resources or generating spiritual guidance.

### **Purpose**

The purpose of the AI interpretation step is to translate messy, human language into a small, structured output that the backend can use to retrieve curated resources.

Example:

User input:  
“I feel frustrated and stuck and don’t know what to do.”

AI output:

* primary: helplessness  
* secondary: frustration, discouragement, uncertainty

The backend then uses those tags to select Scripture, prayer, reflection, and song resources.

---

### **Approved Tag List Only**

In Version 1, the AI may only return tags that already exist in the app’s approved tag list.

This prevents inconsistent outputs such as:

* fear vs afraid  
* hopelessness vs despair  
* loneliness vs isolation

The backend should provide the model with the approved tag vocabulary and instruct it to choose only from that list.

---

### **Output Format**

The AI should return strict JSON only.

Recommended output shape:

{  
  "primary": "helplessness",  
  "secondary": \["frustration", "discouragement"\],  
  "normalizedSummary": "Feeling stuck, frustrated, and unable to move forward"  
}

### **Field rules**

* `primary` must contain exactly one approved tag  
* `secondary` may contain 1 to 3 approved tags  
* `normalizedSummary` is optional but recommended  
* total returned tags should not exceed 4  
* tags should not be duplicated

---

### **Interpretation Principles**

The AI should follow these principles:

* prioritize clear emotional and situational tags  
* choose tags that reflect what the user is feeling or facing  
* avoid overly abstract theological categories unless clearly relevant  
* prefer the deeper issue over the surface wording when appropriate  
* keep output focused rather than broad

Example:

If a user says:  
“I’m so frustrated because nothing is working and I feel stuck”

A good interpretation may be:

* primary: helplessness  
* secondary: frustration, discouragement

rather than simply repeating surface-level wording only.

---

### **Tag Composition Guidance**

The AI should usually return a mix such as:

* one core emotional or situational tag as primary  
* one to three secondary tags that add context

Good examples:

* primary: anxiety  
  secondary: fear, uncertainty  
* primary: grief  
  secondary: loss, loneliness  
* primary: shame  
  secondary: spiritual dryness, fear

The AI should avoid returning only broad spiritual themes like “hope” or “trust” unless the user’s message clearly centers on those.

Those kinds of tags are generally more useful for resource tagging than for user-need interpretation.

---

### **Confidence Scores**

Version 1 does not require confidence scores in the AI output.

If needed later, they may be added, but they are not necessary for the initial matching system.

---

### **Normalized Summary**

The AI should return a short normalized summary when possible.

This summary should:

* briefly restate the user’s need in clearer language  
* remain neutral and compassionate  
* avoid adding interpretation beyond what is reasonably implied

The normalized summary may be used for:

* help request logging  
* internal analytics  
* future UI display if desired

---

### **Failure Handling**

If the AI output is invalid, missing required fields, or includes unapproved tags, the backend should reject the result and use a fallback strategy.

Fallback options may include:

* retrying the interpretation request  
* defaulting to a limited broad-tag mapping  
* returning a small set of general encouragement resources

The system should never depend on malformed AI output.

---

### **Future Tag Suggestion Feature**

In future versions, the system may support an internal AI-assisted tag suggestion workflow.

This should remain separate from live user-facing matching.

Possible future flow:

* AI returns approved tags for matching  
* AI optionally suggests a possible missing tag  
* suggestion is stored for admin review only  
* admin decides whether to ignore, merge, or add the new tag

New tags should never be added automatically in live production without review.

---

And here’s the actual prompt recommendation for v1.

## **Suggested AI System Prompt**

You are an interpretation layer for a Christian spiritual support app.

Your only task is to analyze a user’s message and map it to a small number of approved tags from the provided tag list.

Do not give advice.  
Do not write a prayer.  
Do not explain your reasoning.  
Do not invent new tags.  
Use only tags from the approved list.

Choose:

* exactly 1 primary tag  
* 1 to 3 secondary tags  
* an optional short normalized summary

Prioritize emotional and situational clarity.  
Prefer the deeper core issue when appropriate, not just surface wording.  
Keep the output focused and concise.

Return strict JSON only in this format:

{  
"primary": "approved\_tag\_here",  
"secondary": \["approved\_tag\_here"\],  
"normalizedSummary": "short summary here"  
}

If the user message is vague, still choose the closest approved tags from the list.

---

## **Example runtime prompt structure**

You can send something like:

Approved tags:  
anxiety, fear, grief, shame, loneliness, discouragement, frustration, helplessness, overwhelm, confusion, temptation, uncertainty, waiting, conflict, suffering, spiritual dryness, directionless, doubt, pain, loss

User message:  
"I feel frustrated and stuck and don't know what to do."

Return strict JSON only.

AI test cases

1. Anxiety / overwhelm
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I feel anxious and overwhelmed and my mind will not slow down","sessionId":"test-1"}'
Result: "primary": "anxiety",
"secondary": ["overwhelm"]
"solutions": {
  "peace": 1,
  "trust": 1,
  "rest": 1
}
Note:
Strong match. AI interpretation, mapping, and scoring all behaved as expected. Good baseline case for system correctness.
2. Loneliness
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I feel completely alone and like nobody really understands me","sessionId":"test-2"}'
Result:
"primary": "loneliness",
"secondary": []
"solutions": {
"comfort": 1,
"presence": 1,
"love": 1
}
Note:
Single-emotion case. AI correctly returned no secondary tags.
3. Shame / guilt
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I feel ashamed of what I have done and I cannot forgive myself","sessionId":"test-3"}'
Result:
"primary": "shame",
"secondary": ["guilt"]
"solutions": {
"love": 1,
"acceptance": 1,
"identity": 1,
"forgiveness": 1,
"grace": 1,
"cleansing": 1
}

Note:
Improved after updating the map and adding "guilt" to approved tags. AI interpretation is now more precise, and solutions are populated correctly. Current result is only a weak partial match, which shows a resource coverage gap rather than a problem with interpretation or mapping.
4. Grief / loss
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I lost someone close to me and I do not know how to process it","sessionId":"test-4"}'
Result:
"primary": "grief",
"secondary": ["loss", "confusion"]
"solutions": {
"comfort": 2,
"hope": 2,
"presence": 2,
"wisdom": 1,
"direction": 1,
"clarity": 1
}

Note:
Strong multi-tag interpretation. AI correctly identified grief as primary with appropriate secondary tags. Mapping produced weighted solutions (higher weights for overlapping concepts like comfort/hope/presence), showing that the weighting system is working as intended. Returned resource is a reasonable but still indirect match, indicating good system behavior but limited resource coverage for grief-specific content.
5. Confusion / directionless
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I do not know what direction to take in life and I feel stuck","sessionId":"test-5"}'
Result:
"primary": "directionless",
"secondary": ["confusion", "helplessness"]
"solutions": {
"direction": 2,
"purpose": 1,
"guidance": 1,
"wisdom": 1,
"clarity": 1,
"help": 1,
"trust": 1,
"strength": 1
}

Note:
Very strong interpretation and mapping. Good example of multiple tags combining to produce weighted solutions correctly.
6. Temptation struggle
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I keep falling into the same temptation and I feel weak","sessionId":"test-6"}'
Result:
"primary": "temptation",
"secondary": ["helplessness", "guilt"]
"solutions": {
"strength": 2,
"self-control": 1,
"escape": 1,
"help": 1,
"trust": 1,
"forgiveness": 1,
"grace": 1,
"cleansing": 1
}

Note:
Excellent interpretation. AI captured both the behavioral struggle (temptation) and internal state (helplessness, guilt). Mapping produced a well-balanced set of solutions, and weighting correctly emphasized strength.
7. Spiritual dryness
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I feel distant from God and my heart feels cold","sessionId":"test-7"}'
Result:
"primary": "temptation",
"secondary": ["helplessness", "guilt"]
"solutions": {
"strength": 2,
"self-control": 1,
"escape": 1,
"help": 1,
"trust": 1,
"forgiveness": 1,
"grace": 1,
"cleansing": 1
}

Note:
Excellent interpretation. AI captured both the behavioral struggle (temptation) and internal state (helplessness, guilt). Mapping produced a well-balanced set of solutions, and weighting correctly emphasized strength.
8. Fear / uncertainty
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I am afraid of what is coming next and I feel uncertain about everything","sessionId":"test-8"}'
Result:
"primary": "fear",
"secondary": ["uncertainty"]
"solutions": {
"trust": 2,
"peace": 2,
"courage": 1,
"faith": 1
}

Note:
Very accurate interpretation. Strong alignment between fear and uncertainty, and weighting correctly elevated trust and peace as dominant solutions.
9. Mixed emotions (good test)
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I feel frustrated, tired, and like nothing is changing no matter what I do","sessionId":"test-9"}'
Result:
"primary": "frustration",
"secondary": ["helplessness", "discouragement"]
"solutions": {
"help": 2,
"surrender": 1,
"peace": 1,
"trust": 2,
"strength": 2,
"hope": 1
}

Note:
Excellent multi-layer interpretation. AI correctly captured emotional progression (frustration → helplessness → discouragement). Weighting produced a strong and balanced solution set, and scoring clearly favored the most relevant resource.
10. Subtle / harder case
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I know God is there but I just feel disconnected and numb lately","sessionId":"test-10"}'
Result:
"primary": "spiritual dryness",
"secondary": ["loneliness", "discouragement"]
"solutions": {
"renewal": 1,
"presence": 2,
"faith": 1,
"comfort": 1,
"love": 1,
"hope": 1,
"strength": 1,
"trust": 1
}

Note:
Excellent interpretation of a subtle input. AI correctly identified spiritual dryness with supporting emotional layers. Good example of handling nuanced, less explicit language.
11. Edge Case - no real eomtions used.
curl -X POST http://localhost:3000/api/help -H "Content-Type: application/json" -d '{"input":"I had a really hard conversation today.","sessionId":"fallback-test-1"}'
Result:
"primary": "conflict",
"secondary": ["confusion", "frustration"]
"solutions": {
"peace": 2,
"wisdom": 2,
"reconciliation": 1,
"direction": 1,
"clarity": 1,
"help": 1,
"surrender": 1
}

Note:
Good handling of a low-emotion input. AI inferred conflict from context and added reasonable secondary tags. Clarification triggered on first pass due to weak signal, and second pass returned best available results without looping.
