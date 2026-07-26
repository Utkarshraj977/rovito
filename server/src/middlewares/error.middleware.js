import ApiError from "../utils/apiError.js";
import logger from "../utils/logger.js";
import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      data: null,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message,
      errors: [],
      data: null,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
    errors: [],
    data: null,
  });
};

export default errorHandler;