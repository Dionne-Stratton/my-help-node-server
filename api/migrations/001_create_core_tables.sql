PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (
    type IN ('scripture', 'prayer', 'reflection', 'song')
  ),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_summary TEXT,
  body_text TEXT,
  media_url TEXT,
  image_url TEXT,
  lyrics_text TEXT,
  scripture_reference TEXT,
  scripture_translation TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'published', 'archived')
  ),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL CHECK (
    kind IN ('problem', 'solution')
  ),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS resource_tags (
  resource_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (resource_id, tag_id),
  FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS problem_solution_tag_map (
  problem_tag_id TEXT NOT NULL,
  solution_tag_id TEXT NOT NULL,
  weight REAL NOT NULL DEFAULT 1,
  PRIMARY KEY (problem_tag_id, solution_tag_id),
  FOREIGN KEY (problem_tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  FOREIGN KEY (solution_tag_id) REFERENCES tags(id) ON DELETE CASCADE
);