import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongodbUri) {
    console.warn("MONGODB_URI is not set. Skipping database connection for now.");
    return;
  }

  try {
    const connection = await mongoose.connect(env.mongodbUri);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
