import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  const { passwordHash, ...safeUser } = user;

  req.user = safeUser;

  next();
});

export default authenticate;