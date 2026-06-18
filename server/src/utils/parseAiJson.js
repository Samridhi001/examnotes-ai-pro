export function parseAiJson(rawText) {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("AI response is empty");
  }

  const cleaned = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("AI response does not contain JSON");
  }

  const jsonText = cleaned.slice(firstBrace, lastBrace + 1);

  return JSON.parse(jsonText);
}

export function normalizeAiNotesContent(content) {
  return {
    summary: normalizeString(content.summary, "Summary unavailable."),
    keyPoints: normalizeStringArray(content.keyPoints),
    revisionChecklist: normalizeStringArray(content.revisionChecklist),
    importantQuestions: {
      short: normalizeStringArray(content.importantQuestions?.short),
      long: normalizeStringArray(content.importantQuestions?.long)
    },
    flashcards: normalizeFlashcards(content.flashcards),
    quiz: normalizeQuiz(content.quiz),
    diagram: normalizeString(content.diagram, ""),
    charts: Array.isArray(content.charts) ? content.charts : []
  };
}

function normalizeString(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function normalizeFlashcards(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      front: String(item.front || "").trim(),
      back: String(item.back || "").trim()
    }))
    .filter((item) => item.front && item.back);
}

function normalizeQuiz(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      question: String(item.question || "").trim(),
      answer: String(item.answer || "").trim()
    }))
    .filter((item) => item.question && item.answer);
}