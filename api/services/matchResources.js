import resources from "../data/resources.js";

export default function matchResources(problemTags, solutionWeights) {
  const scoredResults = resources.map((resource) => {
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

  return scoredResults
    .filter((resource) => resource.score > 0)
    .sort((a, b) => b.score - a.score);
}
