import { sendResponse } from "../../utils/sendResponse";
import { asyncHandler } from "../middlewares/asyncHandler";
import { User } from "../models/user.model";
import HttpStatus from "http-status";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Users Fetched Successfully",
    data: users,
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const userData = req.body;

  const user = await User.create(userData);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

