import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { sendCreated } from "../utils/apiResponse.js";
import { createAuthToken, setAuthCookie } from "../utils/token.js";
import { validateRegisterInput } from "../validators/auth.validator.js";

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
