import { AppError } from "../utils/AppError.js";

export function validateGenerateNotesInput(payload) {
  const topic = String(payload.topic || "").trim();
  const sourceText = String(payload.sourceText || "").trim();
  const classLevel = String(payload.classLevel || "General").trim();
  const examType = String(payload.examType || "General").trim();

  if (!topic) {
    throw new AppError("Topic is required", 400);
  }

  if (topic.length < 2) {
    throw new AppError("Topic must be at least 2 characters", 400);
  }

  if (topic.length > 120) {
    throw new AppError("Topic cannot exceed 120 characters", 400);
  }

  if (sourceText && sourceText.length < 40) {
    throw new AppError("Study material must be at least 40 characters when provided", 400);
  }

  return {
    topic,
    sourceText,
    classLevel: classLevel || "General",
    examType: examType || "General",
    revisionMode: Boolean(payload.revisionMode),
    includeDiagram: Boolean(payload.includeDiagram),
    includeChart: Boolean(payload.includeChart)
  };
}