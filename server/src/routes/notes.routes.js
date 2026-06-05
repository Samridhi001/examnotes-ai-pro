import { Router } from "express";
import { generateNotes } from "../controllers/notes.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/generate", protect, generateNotes);

export default router;