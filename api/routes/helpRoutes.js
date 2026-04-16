import express from "express";
import interpretHelpInput from "../services/interpretHelpInput.js";
import mapProblemTags from "../services/mapProblemTags.js";
import matchResources from "../services/matchResources.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { input, sessionId } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({
        error: "input is required and must be a string",
      });
    }

    const interpretation = await interpretHelpInput(input);

    const problemTags = [interpretation.primary, ...interpretation.secondary];

    const solutionWeights = mapProblemTags(problemTags);
    const results = matchResources(problemTags, solutionWeights);

    return res.json({
      sessionId: sessionId ?? null,
      interpretation,
      problems: problemTags,
      solutions: solutionWeights,
      results,
    });
  } catch (error) {
    console.error("HELP ROUTE ERROR:", error.message);

    return res.status(500).json({
      error: "Failed to process help request",
      details: error.message,
    });
  }
});

export default router;
