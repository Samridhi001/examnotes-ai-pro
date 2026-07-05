export function buildNotesMarkdown(note) {
  if (!note) {
    return "";
  }

  const content = note.content || {};

  return [
    `# ${note.topic || "Generated Notes"}`,
    "",
    `Class Level: ${note.classLevel || "N/A"}`,
    `Exam Type: ${note.examType || "N/A"}`,
    `Provider: ${note.generationProvider || "N/A"}`,
    "",
    "## Summary",
    content.summary || "No summary available.",
    "",
    "## Key Points",
    ...(content.keyPoints || []).map((point) => `- ${point}`),
    "",
    "## Revision Checklist",
    ...(content.revisionChecklist || []).map((item) => `- [ ] ${item}`),
    "",
    "## Short Questions",
    ...(content.importantQuestions?.short || []).map(
      (item, index) => `${index + 1}. ${item.question}\n   Answer: ${item.answer}`
    ),
    "",
    "## Long Questions",
    ...(content.importantQuestions?.long || []).map(
      (item, index) => `${index + 1}. ${item.question}\n   Answer: ${item.answer}`
    ),
    "",
    "## Flashcards",
    ...(content.flashcards || []).map(
      (card, index) => `${index + 1}. Front: ${card.front}\n   Back: ${card.back}`
    ),
    "",
    "## Quiz",
    ...(content.quiz || []).map(
      (item, index) => `${index + 1}. ${item.question}\n   Answer: ${item.answer}`
    )
  ].join("\n");
}

export function downloadTextFile({ fileName, content, mimeType = "text/plain" }) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export function createSafeFileName(value) {
  return String(value || "exam-notes")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}