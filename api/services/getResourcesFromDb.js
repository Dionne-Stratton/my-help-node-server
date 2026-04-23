export default async function getResourcesFromDb(db) {
  const result = await db
    .prepare(
      `
      SELECT 
        r.id,
        r.type,
        r.title,
        r.slug,
        r.body_text,
        r.scripture_reference,
        t.name AS tag,
        t.kind AS tag_kind
      FROM resources r
      LEFT JOIN resource_tags rt ON rt.resource_id = r.id
      LEFT JOIN tags t ON t.id = rt.tag_id
      WHERE r.status = 'published'
    `,
    )
    .all();

  const rows = result.results;

  const resourceMap = {};

  for (const row of rows) {
    if (!resourceMap[row.id]) {
      resourceMap[row.id] = {
        id: row.id,
        type: row.type,
        title: row.title,
        slug: row.slug,
        body_text: row.body_text,
        scripture_reference: row.scripture_reference,
        solutionTags: [],
        problemTags: [],
      };
    }

    if (row.tag && row.tag_kind === "solution") {
      resourceMap[row.id].solutionTags.push(row.tag);
    } else if (row.tag && row.tag_kind === "problem") {
      resourceMap[row.id].problemTags.push(row.tag);
    }
  }

  return Object.values(resourceMap);
}
