export default async function mapProblemTags(db, problemTags) {
  if (!problemTags?.length) {
    return {};
  }

  const placeholders = problemTags.map(() => "?").join(", ");
  const result = await db
    .prepare(
      `
      SELECT st.name AS solution_tag, SUM(psm.weight) AS total_weight
      FROM problem_solution_tag_map psm
      JOIN tags pt ON pt.id = psm.problem_tag_id
      JOIN tags st ON st.id = psm.solution_tag_id
      WHERE pt.kind = 'problem'
        AND st.kind = 'solution'
        AND pt.name IN (${placeholders})
      GROUP BY st.name
    `,
    )
    .bind(...problemTags)
    .all();

  const solutionWeights = {};
  for (const row of result.results ?? []) {
    solutionWeights[row.solution_tag] = Number(row.total_weight) || 0;
  }
  return solutionWeights;
}
