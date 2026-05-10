import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { sendCreated, sendSuccess } from "../utils/apiResponse.js";
import { clearAuthCookie, createAuthToken, setAuthCookie } from "../utils/token.js";
import { validateLoginInput, validateRegisterInput } from "../validators/auth.validator.js";

export const registerUser = asyncHandler(async (req, res) => {
  const input = validateRegisterInput(req.body);

  const existingUser = await User.findOne({
    email: input.email
  });

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const user = await User.create(input);

  const token = createAuthToken(user._id.toString());
  setAuthCookie(res, token);

  return sendCreated(
    res,
    {
      user: user.toPublicJSON()
    },
    "Account created successfully"
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const input = validateLoginInput(req.body);

  const user = await User.findOne({
    email: input.email
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await user.comparePassword(input.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = createAuthToken(user._id.toString());
  setAuthCookie(res, token);

  return sendSuccess(
    res,
    {
      user: user.toPublicJSON()
    },
    "Logged in successfully"
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    {
      user: req.user.toPublicJSON()
    },
    "Current user fetched successfully"
  );
});

export const logoutUser = asyncHandler(async (req, res) => {
  clearAuthCookie(res);

  return sendSuccess(
    res,
    {},
    "Logged out successfully"
  );
});


