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

const INSTRUCTIONS = `
You are an interpretation layer for a Christian spiritual support app.

Your only task is to analyze a user's message and map it to a small number of approved tags.

Rules:
- Do not give advice.
- Do not write a prayer.
- Do not explain your reasoning.
- Do not invent new tags.
- Use only tags from the approved list.
- Return exactly 1 primary tag.
- Return 1 to 3 secondary tags.
- Do not duplicate tags.
- Return strict JSON only.

Return this exact shape:
{
  "primary": "approved_tag_here",
  "secondary": ["approved_tag_here"],
  "normalizedSummary": "short summary here"
}
`.trim();

export default async function interpretHelpInput(input) {
  const trimmedInput = input?.trim();

  if (!trimmedInput) {
    throw new Error("Input is required");
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const { default: OpenAI } = await import("openai");

  const openai = new OpenAI({ apiKey });

  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    instructions: INSTRUCTIONS,
    input: `
Approved tags:
${APPROVED_TAGS.join(", ")}

User message:
"${trimmedInput}"

Return strict JSON only.
`.trim(),
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

  const { primary, secondary, normalizedSummary } = parsed;

  if (!primary || !Array.isArray(secondary)) {
    throw new Error("OpenAI response is missing required fields");
  }

  if (!APPROVED_TAGS.includes(primary)) {
    throw new Error(`Invalid primary tag returned: ${primary}`);
  }

  const uniqueSecondary = [...new Set(secondary)];

  for (const tag of uniqueSecondary) {
    if (!APPROVED_TAGS.includes(tag)) {
      throw new Error(`Invalid secondary tag returned: ${tag}`);
    }
  }

  if (uniqueSecondary.includes(primary)) {
    throw new Error("Primary tag must not also appear in secondary tags");
  }

  return {
    primary,
    secondary: uniqueSecondary,
    normalizedSummary: normalizedSummary ?? null,
  };
}