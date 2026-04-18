import express from "express";
import crypto from "crypto";
import interpretHelpInput from "../services/interpretHelpInput.js";
import mapProblemTags from "../services/mapProblemTags.js";
import matchResources from "../services/matchResources.js";

const router = express.Router();

function cleanResource(resource) {
  const { problemTags, solutionTags, ...cleaned } = resource;
  return cleaned;
}

function cleanBundle(bundle) {
  return {
    scripture: bundle.scripture.map(cleanResource),
    prayer: bundle.prayer.map(cleanResource),
    reflection: bundle.reflection.map(cleanResource),
    song: bundle.song.map(cleanResource),
  };
}

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
    const matchedBundle = matchResources(problemTags, solutionWeights);
    const bundle = cleanBundle(matchedBundle);

    return res.json({
      sessionId: sessionId ?? null,
      bundle,
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
