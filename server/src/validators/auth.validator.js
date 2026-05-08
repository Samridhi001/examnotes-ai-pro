import { AppError } from "../utils/AppError.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterInput({ name, email, password }) {
  const normalizedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");

  if (!normalizedName) {
    throw new AppError("Name is required", 400);
  }

  if (normalizedName.length < 2) {
    throw new AppError("Name must be at least 2 characters", 400);
  }

  if (!normalizedEmail) {
    throw new AppError("Email is required", 400);
  }

  if (!emailPattern.test(normalizedEmail)) {
    throw new AppError("Please provide a valid email address", 400);
  }

  if (!normalizedPassword) {
    throw new AppError("Password is required", 400);
  }

  if (normalizedPassword.length < 8) {
    throw new AppError("Password must be at least 8 characters", 400);
  }

  return {
    name: normalizedName,
    email: normalizedEmail,
    password: normalizedPassword
  };
}
