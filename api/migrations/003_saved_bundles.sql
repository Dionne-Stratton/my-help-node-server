-- Ownership always comes from the validated Auth0 access-token subject.
CREATE TABLE IF NOT EXISTS saved_bundles (
  id TEXT PRIMARY KEY,
  user_subject TEXT NOT NULL,
  source_id TEXT NOT NULL,
  title TEXT NOT NULL,
  bundle_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE (user_subject, source_id)
);
CREATE INDEX IF NOT EXISTS idx_saved_bundles_owner ON saved_bundles(user_subject);
