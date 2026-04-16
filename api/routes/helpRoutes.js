import express from "express";
import interpretHelpInput from "../services/interpretHelpInput.js";
import mapProblemTags from "../services/mapProblemTags.js";
import matchResources from "../services/matchResources.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { input, sessionId, clarificationAttempted = false } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({
        error: "input is required and must be a string",
      });
    }

    const interpretation = await interpretHelpInput(input);

    const problemTags = [
      interpretation.primary,
      ...interpretation.secondary,
    ];

    const solutionWeights = mapProblemTags(problemTags);
    const results = matchResources(problemTags, solutionWeights);

    const topScore = results[0]?.score ?? 0;
    const needsClarification =
      !interpretation.primary ||
      Object.keys(solutionWeights).length === 0 ||
      results.length === 0 ||
      topScore <= 1;

    if (needsClarification && !clarificationAttempted) {
      return res.json({
        needsClarification: true,
        message:
          "I hear what you're saying. Can you tell me a little more about how you're feeling right now?",
        suggestedFeelings: [
          "anxious",
          "afraid",
          "alone",
          "ashamed",
          "discouraged",
          "confused",
          "overwhelmed",
        ],
      });
    }

    return res.json({
      sessionId: sessionId ?? null,
      clarificationAttempted,
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