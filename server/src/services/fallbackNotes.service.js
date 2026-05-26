const sentencePattern = /(?<=[.!?])\s+/;

const stopWords = new Set([
  "the",
  "and",
  "for",
  "that",
  "this",
  "with",
  "from",
  "into",
  "are",
  "was",
  "were",
  "has",
  "have",
  "had",
  "you",
  "your",
  "will",
  "can",
  "about",
  "they",
  "their",
  "there",
  "when",
  "what",
  "which",
  "also",
  "than",
  "then",
  "them",
  "been",
  "because",
  "using",
  "used",
  "use",
  "its",
  "it",
  "is",
  "to",
  "of",
  "in",
  "on",
  "a",
  "an",
  "by",
  "as",
  "at",
  "or",
  "be"
]);

export function generateFallbackNotes(input) {
  const sentences = splitSentences(input.sourceText);
  const keywords = extractKeywords(input.sourceText || input.topic);
  const summary = buildSummary(input, sentences);
  const keyPoints = buildKeyPoints(input, sentences, keywords);

  return {
    summary,
    keyPoints,
    revisionChecklist: buildRevisionChecklist(input.topic, keywords),
    importantQuestions: buildImportantQuestions(input.topic, keywords),
    flashcards: buildFlashcards(input.topic, sentences, keywords),
    quiz: buildQuiz(input.topic, sentences, keywords),
    diagram: input.includeDiagram ? buildSimpleDiagram(input.topic, keywords) : "",
    charts: input.includeChart ? buildSimpleChartData(keywords) : []
  };
}

function splitSentences(text) {
  return String(text || "")
    .split(sentencePattern)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function extractKeywords(text) {
  const words = String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  const frequency = new Map();

  for (const word of words) {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }

  const keywords = [...frequency.entries()]
    .sort((first, second) => second[1] - first[1])
    .slice(0, 8)
    .map(([word]) => word);

  return keywords.length > 0 ? keywords : ["definition", "importance", "examples"];
}

function buildSummary(input, sentences) {
  if (sentences.length > 0) {
    const limit = input.revisionMode ? 2 : 4;
    return sentences.slice(0, limit).join(" ");
  }

  return `${input.topic} is an important topic for ${input.examType || "exam"} preparation. These notes summarize the key ideas, revision points, and likely questions for quick study.`;
}

function buildKeyPoints(input, sentences, keywords) {
  if (sentences.length > 0) {
    return sentences.slice(0, input.revisionMode ? 5 : 8);
  }

  return keywords.map((keyword) => `${capitalize(keyword)} is a key concept to revise under ${input.topic}.`);
}

function buildRevisionChecklist(topic, keywords) {
  return keywords.slice(0, 6).map((keyword) => {
    return `Can I explain ${keyword} in the context of ${topic}?`;
  });
}

function buildImportantQuestions(topic, keywords) {
  return {
    short: keywords.slice(0, 4).map((keyword) => `Define ${keyword} in relation to ${topic}.`),
    long: [
      `Explain ${topic} with its important concepts and examples.`,
      `Discuss the role and importance of ${keywords[0]} in ${topic}.`
    ]
  };
}

function buildFlashcards(topic, sentences, keywords) {
  return keywords.slice(0, 6).map((keyword) => {
    const sentence = sentences.find((item) => item.toLowerCase().includes(keyword));

    return {
      front: `What should you remember about ${keyword}?`,
      back: sentence || `${capitalize(keyword)} is an important concept in ${topic}.`
    };
  });
}

function buildQuiz(topic, sentences, keywords) {
  return keywords.slice(0, 5).map((keyword, index) => {
    const sentence = sentences[index] || sentences.find((item) => item.toLowerCase().includes(keyword));

    return {
      question: `Question ${index + 1}: How is ${keyword} connected to ${topic}?`,
      answer: sentence || `${capitalize(keyword)} is connected to ${topic} as an important exam concept.`
    };
  });
}

function buildSimpleDiagram(topic, keywords) {
  const first = keywords[0] || "concept";
  const second = keywords[1] || "application";

  return `graph TD
  A[${topic}] --> B[${capitalize(first)}]
  A --> C[${capitalize(second)}]
  B --> D[Revision]
  C --> E[Exam Questions]`;
}

function buildSimpleChartData(keywords) {
  return [
    {
      type: "bar",
      title: "Keyword Importance",
      data: keywords.slice(0, 5).map((keyword, index) => ({
        name: capitalize(keyword),
        value: 100 - index * 12
      }))
    }
  ];
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}