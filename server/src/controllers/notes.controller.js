import { Note } from "../models/Note.js";
import { generateFallbackNotes } from "../services/fallbackNotes.service.js";
import { sendCreated } from "../utils/apiResponse.js";
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