import problemToSolutionMap from "../data/problemToSolutionMap.js";

export default function mapProblemTags(problemTags) {
  const solutionWeights = {};

  for (const problemTag of problemTags) {
    const mappedSolutions = problemToSolutionMap[problemTag] || [];

    for (const solutionTag of mappedSolutions) {
      solutionWeights[solutionTag] = (solutionWeights[solutionTag] || 0) + 1;
    }
  }

  return solutionWeights;
}
