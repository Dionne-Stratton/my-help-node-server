const APPROVED_TAGS = [
  "anxiety",
  "fear",
  "grief",
  "shame",
  "guilt",
  "loneliness",
  "discouragement",
  "frustration",
  "helplessness",
  "overwhelm",
  "confusion",
  "temptation",
  "uncertainty",
  "waiting",
  "conflict",
  "suffering",
  "spiritual dryness",
  "directionless",
  "doubt",
  "pain",
  "loss",
];

const APPROVED_TAG_SET = new Set(APPROVED_TAGS);
const MAX_ATTEMPTS = 3;

const INSTRUCTIONS = `
You are an interpretation layer for a Christian spiritual support app.

Your only task is to analyze a user's message and map it to approved tags.

You must follow these rules exactly:
- Do not give advice.
- Do not write a prayer.
- Do not explain your reasoning.
- Do not invent new tags.
- Use only tags from the approved list provided below.
- Return exactly 1 primary tag.
- Return 0 to 3 secondary tags.
- Do not duplicate tags.
- Do not repeat the primary tag in secondary.
- If a possible secondary tag is uncertain, leave it out.
- It is better to return no secondary tags than to return a wrong tag.
- Map user wording like "stuck" or similar phrases to the closest approved tag instead of inventing synonyms.
- normalizedSummary should be short, compassionate, and neutral.

Approved tags:
${APPROVED_TAGS.join(", ")}
`.trim();

const TAG_RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    primary: {
      type: "string",
      enum: APPROVED_TAGS,
    },
    secondary: {
      type: "array",
      items: {
        type: "string",
        enum: APPROVED_TAGS,
      },
      maxItems: 3,
    },
    normalizedSummary: {
      type: ["string", "null"],
    },
  },
  required: ["primary", "secondary", "normalizedSummary"],
};

function normalizeResult(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("OpenAI response is missing structured data");
  }

  const primary =
    typeof raw.primary === "string" && APPROVED_TAG_SET.has(raw.primary)
      ? raw.primary
      : null;

  const secondaryInput = Array.isArray(raw.secondary) ? raw.secondary : [];

  const secondary = [
    ...new Set(
      secondaryInput.filter(
        (tag) =>
          typeof tag === "string" &&
          APPROVED_TAG_SET.has(tag) &&
          tag !== primary,
      ),
    ),
  ];

  const normalizedSummary =
    typeof raw.normalizedSummary === "string" && raw.normalizedSummary.trim()
      ? raw.normalizedSummary.trim()
      : null;

  if (!primary) {
    throw new Error("OpenAI returned an invalid primary tag");
  }

  return {
    primary,
    secondary,
    normalizedSummary,
  };
}

async function requestInterpretation(openai, trimmedInput) {
  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    store: false,
    instructions: INSTRUCTIONS,
    input: [
      {
        role: "user",
        content: `User message:\n"${trimmedInput}"`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "approved_tag_interpretation",
        strict: true,
        schema: TAG_RESPONSE_SCHEMA,
      },
    },
  });

  const outputText = response.output_text?.trim();

  if (!outputText) {
    throw new Error("OpenAI returned an empty response");
  }

  let parsed;

  try {
    parsed = JSON.parse(outputText);
  } catch (error) {
    console.error("Failed to parse OpenAI response:", outputText);
    throw new Error("OpenAI returned invalid JSON");
  }

  return normalizeResult(parsed);
}

export default async function interpretHelpInput(input, options = {}) {
  const trimmedInput = input?.trim();

  if (!trimmedInput) {
    throw new Error("Input is required");
  }

  const apiKey = options.apiKey ?? globalThis?.process?.env?.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey });

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await requestInterpretation(openai, trimmedInput);
    } catch (error) {
      lastError = error;
      console.error(
        `interpretHelpInput attempt ${attempt} failed:`,
        error?.message ?? error,
      );
    }
  }

  throw new Error(
    `Failed to interpret help input after ${MAX_ATTEMPTS} attempts: ${
      lastError?.message ?? "unknown error"
    }`,
  );
}
