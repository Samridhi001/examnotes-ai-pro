import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuthCookieName } from "../utils/token.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[getAuthCookieName()];

  if (!token) {
    throw new AppError("You must be logged in to access this resource", 401);
  }

  if (!env.jwtSecret) {
    throw new AppError("JWT_SECRET is not configured", 500);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch (error) {
    throw new AppError("Invalid or expired session", 401);
  }

  const user = await User.findById(decoded.sub);

  if (!user) {
    throw new AppError("User for this session no longer exists", 401);
  }

  req.user = user;
  req.userId = user._id.toString();

  next();
});
