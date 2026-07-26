import ApiError from "../utils/apiError.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: You do not have permission");
    }

    next();
  };
};

export default authorize;