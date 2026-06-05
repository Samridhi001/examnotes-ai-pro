import { Note } from "../models/Note.js";
import { generateFallbackNotes } from "../services/fallbackNotes.service.js";
import { AppError } from "../utils/AppError.js";
import { sendCreated, sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateGenerateNotesInput } from "../validators/note.validator.js";

export const generateNotes = asyncHandler(async (req, res) => {
  const input = validateGenerateNotesInput(req.body);
  const content = generateFallbackNotes(input);

  const note = await Note.create({
    user: req.userId,
    ...input,
    generationProvider: "fallback",
    content
  });

  return sendCreated(
    res,
    {
      note
    },
    "Notes generated successfully"
  );
});

export const getNotesHistory = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    user: req.userId
  })
    .sort({
      createdAt: -1
    })
    .select("topic classLevel examType revisionMode generationProvider createdAt updatedAt");

  return sendSuccess(
    res,
    {
      notes
    },
    "Notes history fetched successfully"
  );
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.userId
  });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return sendSuccess(
    res,
    {
      note
    },
    "Note fetched successfully"
  );
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.noteId,
    user: req.userId
  });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return sendSuccess(
    res,
    {},
    "Note deleted successfully"
  );
});