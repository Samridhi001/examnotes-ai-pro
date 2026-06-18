import { generateFallbackNotes } from "./fallbackNotes.service.js";
import { generateGeminiNotes } from "./geminiNotes.service.js";

export async function generateNotesContent(input) {
  try {
    const content = await generateGeminiNotes(input);

    return {
      provider: "gemini",
      content
    };
  } catch (error) {
    console.warn(`Gemini unavailable. Using fallback generator. Reason: ${error.message}`);

    return {
      provider: "fallback",
      content: generateFallbackNotes(input)
    };
  }
}