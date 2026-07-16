import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as authService from "./auth.service.js";
import cookieOptions from "../../utils/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {

    const { token, user } = await authService.registerUser(req.body);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            user
        )
    );
});

export const login = asyncHandler(async (req, res) => {

  const { token, user } = await authService.loginUser(req.body);

  res.cookie("token", token, cookieOptions);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      user
    )
  );
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      "User fetched successfully",
      user
    )
  );
});