import { Router } from "express";
import {
  deleteNote,
  generateNotes,
  getNoteById,
  getNotesHistory
} from "../controllers/notes.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/generate", generateNotes);
router.get("/", getNotesHistory);
router.get("/:noteId", getNoteById);
router.delete("/:noteId", deleteNote);

export default router;