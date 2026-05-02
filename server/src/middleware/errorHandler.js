import { isProduction } from "../config/env.js";

export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (!error.isOperational) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    ...(isProduction() ? {} : { stack: error.stack })
  });
}
