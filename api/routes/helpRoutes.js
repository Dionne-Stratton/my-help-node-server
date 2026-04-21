import express from "express";
import interpretHelpInput from "../services/interpretHelpInput.js";
import mapProblemTags from "../services/mapProblemTags.js";
import matchResources from "../services/matchResources.js";
import getResourcesFromDb from "../services/getResourcesFromDb.js";

function cleanResource(resource) {
  const { score, problemTags, solutionTags, ...cleaned } = resource;
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

export default function createHelpRouter(db) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      if (!db) {
        return res.status(503).json({
          error:
            "Database is not available in this process. Run the Worker with `npm run dev` (wrangler) for D1-backed /api/help.",
        });
      }

      const { input, sessionId } = req.body;

      if (!input || typeof input !== "string") {
        return res.status(400).json({
          error: "input is required and must be a string",
        });
      }

      const interpretation = await interpretHelpInput(input);

      const problemTags = [interpretation.primary, ...interpretation.secondary];

      const solutionWeights = await mapProblemTags(db, problemTags);
      const resources = await getResourcesFromDb(db);
      const matchedBundle = matchResources(
        problemTags,
        solutionWeights,
        resources,
      );
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

  return router;
}
