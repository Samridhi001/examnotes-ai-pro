import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    front: {
      type: String,
      required: true,
      trim: true,
    },
    back: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const generatedContentSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    revisionChecklist: {
      type: [String],
      default: [],
    },
    importantQuestions: {
      short: {
        type: [String],
        default: [],
      },
      long: {
        type: [String],
        default: [],
      },
    },
    flashcards: {
      type: [flashcardSchema],
      default: [],
    },
    quiz: {
      type: [quizQuestionSchema],
      default: [],
    },
    diagram: {
      type: String,
      default: "",
    },
    charts: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    sourceText: {
      type: String,
      trim: true,
      default: "",
    },
    classLevel: {
      type: String,
      trim: true,
      default: "General",
    },
    examType: {
      type: String,
      trim: true,
      default: "General",
    },
    revisionMode: {
      type: Boolean,
      default: false,
    },
    includeDiagram: {
      type: Boolean,
      default: false,
    },
    includeChart: {
      type: Boolean,
      default: false,
    },
    generationProvider: {
      type: String,
      enum: ["fallback", "gemini"],
      default: "fallback",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    content: {
      type: generatedContentSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.index({
  user: 1,
  createdAt: -1,
});

export const Note = mongoose.model("Note", noteSchema);
