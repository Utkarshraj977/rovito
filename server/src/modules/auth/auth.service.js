import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "./auth.repository.js";
import ApiError from "../../utils/apiError.js";
import env from "../../config/env.js";

const registerUser = async (userData) => {
  const existingUser = await authRepository.findUserByEmail(
    userData.email
  );

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    10
  );

  const { password, ...rest } = userData;

  const user = await authRepository.createUser({
    ...rest,
    passwordHash: hashedPassword,
  });

  const { passwordHash, ...safeUser } = user;

  return safeUser;
};

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account is disabled");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRY,
    }
  );

  const { passwordHash, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
  };
};

const logoutUser = async () => {
  return true;
};

const getCurrentUser = async (user) => {
  return user;
};

const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await authRepository.updatePassword(
    userId,
    hashedPassword
  );

  return true;
};

const updateProfile = async (userId, data) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updatedUser =
    await authRepository.updateProfile(
      userId,
      data
    );

  const { passwordHash, ...safeUser } =
    updatedUser;

  return safeUser;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changePassword,
  updateProfile,
};