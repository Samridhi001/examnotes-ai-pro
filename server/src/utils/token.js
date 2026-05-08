import jwt from "jsonwebtoken";
import { env, isProduction } from "../config/env.js";
import { AppError } from "./AppError.js";

const authCookieName = "examnotes_token";

export function createAuthToken(userId) {
  if (!env.jwtSecret) {
    throw new AppError("JWT_SECRET is not configured", 500);
  }

  return jwt.sign(
    {
      sub: userId
    },
    env.jwtSecret,
    {
      expiresIn: "7d"
    }
  );
}

export function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: isProduction() ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(authCookieName, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: isProduction() ? "none" : "lax"
  });
}

export function getAuthCookieName() {
  return authCookieName;
}
