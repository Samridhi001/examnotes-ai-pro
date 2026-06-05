import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import healthRouter from "./routes/health.routes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDatabase } from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import notesRouter from "./routes/notes.routes.js";





const app = express();

const PORT = env.port;
const CLIENT_URL = env.clientUrl;


app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);


app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`ExamNotesAI Pro API running on http://localhost:${PORT}`);
  await connectDatabase();
});

