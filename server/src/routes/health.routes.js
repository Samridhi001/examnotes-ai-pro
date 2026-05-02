import { Router } from "express";
import { sendSuccess } from "../utils/apiResponse.js";

const router = Router();

router.get("/", (req, res) => {
  return sendSuccess(
    res,
    {
      app: "ExamNotesAI Pro",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    },
    "API is healthy"
  );
});

export default router;
