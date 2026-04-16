import express from "express";

import mapProblemTags from "../services/mapProblemTags.js";
import matchResources from "../services/matchResources.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { problemTags } = req.body;

  if (!Array.isArray(problemTags)) {
    return res.status(400).json({
      error: "problemTags must be an array",
    });
  }

  const solutionWeights = mapProblemTags(problemTags);
  const results = matchResources(problemTags, solutionWeights);

  return res.json({
    problems: problemTags,
    solutions: solutionWeights,
    results,
  });
});

export default router;
