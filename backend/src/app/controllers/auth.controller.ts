import { env } from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";
import { asyncHandler } from "../middlewares/asyncHandler";
import { AuthService } from "../services/auth.services";
import HttpStatus from "http-status";

const getCookieOptions = () => {
  const isProduction = env.nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    maxAge: env.jwtCookieExpiresIn * 24 * 60 * 60 * 1000,
    path: "/",
  };
};


const register = asyncHandler(async (req, res) => {
  const result = await AuthService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

res.cookie("accessToken", result.accessToken, getCookieOptions());

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "User Logged in successfully.",
    data: result.user,
  });
});

const logout = asyncHandler(async (req, res) => {
  const isProduction = env.nodeEnv === "production";

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    message: "User Logged out successfully",
    success: true,
    data: null,
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await AuthService.getMe(req.user!.userId);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Authenticatred User Fetched successfully",
    data: user,
  });
});

export const AuthController = {
  register,
  login,
  logout,
  me,
};
