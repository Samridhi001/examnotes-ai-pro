import { Router } from "express";
import {
  deleteNote,
  generateNotes,
  getNoteById,
  getNotesHistory,
  getNotesStats,
  toggleFavoriteNote
} from "../controllers/notes.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/generate", generateNotes);
router.get("/", getNotesHistory);
router.get("/:noteId", getNoteById);
router.delete("/:noteId", deleteNote);
router.patch("/:noteId/favorite", protect, toggleFavoriteNote);
router.delete("/:noteId", protect, deleteNote);
router.get("/stats", protect, getNotesStats);

export default router;