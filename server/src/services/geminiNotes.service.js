import { env } from "../config/env.js";
import { normalizeAiNotesContent, parseAiJson } from "../utils/parseAiJson.js";
import { buildGeminiNotesPrompt } from "../utils/geminiPromptBuilder.js";

export async function generateGeminiNotes(input) {
  if (!env.geminiApiKey) {
    throw new Error("Gemini API key is not configured");
  }

  const prompt = buildGeminiNotesPrompt(input);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${errorText}`);
  }

  const data = await response.json();

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned no text");
  }

  const parsed = parseAiJson(text);

  return normalizeAiNotesContent(parsed);
}