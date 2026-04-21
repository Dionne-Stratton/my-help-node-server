export default function matchResources(
  problemTags,
  solutionWeights,
  sourceResources,
) {
  const scoredResults = sourceResources.map((resource) => {
    let score = 0;

    for (const tag of resource.solutionTags) {
      if (solutionWeights[tag]) {
        score += solutionWeights[tag];
      }
    }

    for (const tag of resource.problemTags) {
      if (problemTags.includes(tag)) {
        score += 1;
      }
    }

    return {
      ...resource,
      score,
    };
  });

  const ranked = scoredResults
    .filter((resource) => resource.score > 0)
    .sort((a, b) => b.score - a.score);

  // Bundle selection happens here
  return {
    scripture: ranked.filter((r) => r.type === "scripture").slice(0, 3),
    prayer: ranked.filter((r) => r.type === "prayer").slice(0, 1),
    reflection: ranked.filter((r) => r.type === "reflection").slice(0, 1),
    song: ranked.filter((r) => r.type === "song").slice(0, 1),
  };
}
