import getResourcesFromDb from "./services/getResourcesFromDb.js";
import interpretHelpInput from "./services/interpretHelpInput.js";
import mapProblemTags from "./services/mapProblemTags.js";
import matchResources from "./services/matchResources.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

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

async function handleHelpRequest(request, env) {
  let body;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Request body must be valid JSON" }, 400);
  }

  const { input, sessionId } = body ?? {};

  if (!input || typeof input !== "string") {
    return json({ error: "input is required and must be a string" }, 400);
  }

  try {
    const interpretation = await interpretHelpInput(input, {
      apiKey: env.OPENAI_API_KEY,
    });
    const problemTags = [interpretation.primary, ...interpretation.secondary];
    const solutionWeights = await mapProblemTags(env.DB, problemTags);
    const resources = await getResourcesFromDb(env.DB);
    const matchedBundle = matchResources(
      problemTags,
      solutionWeights,
      resources,
    );
    const bundle = cleanBundle(matchedBundle);

    return json({
      sessionId: sessionId ?? null,
      bundle,
    });
  } catch (error) {
    console.error("HELP ROUTE ERROR:", error?.message ?? error);
    return json(
      {
        error: "Failed to process help request",
        details: error?.message ?? "Unknown error",
      },
      500,
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("Server is running", { headers: CORS_HEADERS });
    }

    if (request.method === "POST" && url.pathname === "/api/help") {
      return handleHelpRequest(request, env);
    }

    return json({ error: "Not Found" }, 404);
  },
};
