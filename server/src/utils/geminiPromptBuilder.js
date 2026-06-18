export function buildGeminiNotesPrompt(input) {
  return `
You are an exam preparation assistant.

Your task is to generate structured study material for a student.

Return ONLY valid JSON.
Do not include markdown fences.
Do not include explanations outside JSON.
Do not include comments.
Use double quotes for all JSON keys and string values.

INPUT:
Topic: ${input.topic}
Class Level: ${input.classLevel}
Exam Type: ${input.examType}
Revision Mode: ${input.revisionMode ? "ON" : "OFF"}
Include Diagram: ${input.includeDiagram ? "YES" : "NO"}
Include Chart: ${input.includeChart ? "YES" : "NO"}

Study Material:
${input.sourceText || "No source material provided. Generate topic-based exam notes."}

RULES:
- Keep language clear and exam-focused.
- If revision mode is ON, make content shorter and more direct.
- If revision mode is OFF, include slightly more explanation.
- Generate useful flashcards and quiz questions.
- If Include Diagram is YES, provide Mermaid flowchart syntax as a string.
- If Include Diagram is NO, use an empty string for diagram.
- If Include Chart is YES, provide chart data as an array.
- If Include Chart is NO, use an empty array for charts.

STRICT JSON SHAPE:
{
  "summary": "string",
  "keyPoints": ["string"],
  "revisionChecklist": ["string"],
  "importantQuestions": {
    "short": ["string"],
    "long": ["string"]
  },
  "flashcards": [
    {
      "front": "string",
      "back": "string"
    }
  ],
  "quiz": [
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "diagram": "string",
  "charts": [
    {
      "type": "bar",
      "title": "string",
      "data": [
        {
          "name": "string",
          "value": 10
        }
      ]
    }
  ]
}
`;
}