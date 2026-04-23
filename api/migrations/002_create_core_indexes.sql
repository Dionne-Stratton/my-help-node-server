CREATE INDEX IF NOT EXISTS idx_resources_type
  ON resources(type);

CREATE INDEX IF NOT EXISTS idx_resources_status
  ON resources(status);

CREATE INDEX IF NOT EXISTS idx_resources_slug
  ON resources(slug);

CREATE INDEX IF NOT EXISTS idx_tags_name
  ON tags(name);

CREATE INDEX IF NOT EXISTS idx_tags_kind
  ON tags(kind);

CREATE INDEX IF NOT EXISTS idx_resource_tags_resource_id
  ON resource_tags(resource_id);

CREATE INDEX IF NOT EXISTS idx_resource_tags_tag_id
  ON resource_tags(tag_id);

CREATE INDEX IF NOT EXISTS idx_problem_solution_tag_map_problem_tag_id
  ON problem_solution_tag_map(problem_tag_id);

CREATE INDEX IF NOT EXISTS idx_problem_solution_tag_map_solution_tag_id
  ON problem_solution_tag_map(solution_tag_id);