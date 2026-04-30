import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    app: "ExamNotesAI Pro",
    message: "API is healthy"
  });
});

export default router;
