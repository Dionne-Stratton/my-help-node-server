function scoreResource(resource, problemTags, solutionWeights) {
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
}

export default function matchResources(
  problemTags,
  solutionWeights,
  sourceResources,
) {
  const ranked = sourceResources
    .map((resource) => scoreResource(resource, problemTags, solutionWeights))
    .filter((resource) => resource.score > 0)
    .sort((a, b) => b.score - a.score);

  const scriptures = ranked.filter((r) => r.type === "scripture").slice(0, 3);
  console.log(
    "Initial scriptures:",
    scriptures.map((s) => s.scripture_reference),
  );
  const prayer = ranked.filter((r) => r.type === "prayer").slice(0, 1);
  const reflection = ranked.filter((r) => r.type === "reflection").slice(0, 1);
  const song = ranked.filter((r) => r.type === "song").slice(0, 1);

  // helper: check if scripture already included
  function hasScripture(reference) {
    return scriptures.some((s) => s.scripture_reference === reference);
  }

  // helper: find scripture by reference
  function findScripture(reference) {
    return ranked.find(
      (r) => r.type === "scripture" && r.scripture_reference === reference,
    );
  }

  // ---- anchor logic ----

  const prayerRef = prayer[0]?.scripture_reference;
  if (prayerRef && !hasScripture(prayerRef)) {
    const match = findScripture(prayerRef);
    if (match) {
      scriptures.push(match);
    }
  }

  const reflectionRef = reflection[0]?.scripture_reference;
  if (reflectionRef && !hasScripture(reflectionRef)) {
    const match = findScripture(reflectionRef);
    if (match) {
      scriptures.push(match);
    }
  }

  console.log("Prayer ref:", prayerRef);
  console.log("Reflection ref:", reflectionRef);

  return {
    scripture: scriptures,
    prayer,
    reflection,
    song,
  };
}
