import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import env from "../../config/env.js";

import authService from "./auth.service.js";

// Register
const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      user,
      "User registered successfully"
    )
  );
});

// Login
const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: result.user,
      },
      "Login successful"
    )
  );
});

// Logout
const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser();

  res.clearCookie("accessToken");

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Logout successful"
    )
  );
});

// Get Current User
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "User fetched successfully"
    )
  );
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Password changed successfully"
    )
  );
});

const updateProfile = asyncHandler(
  async (req, res) => {
    const user =
      await authService.updateProfile(
        req.user.id,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Profile updated successfully"
      )
    );
  }
);

export {
  register,
  login,
  logout,
  changePassword,
  getMe,
  updateProfile,
};