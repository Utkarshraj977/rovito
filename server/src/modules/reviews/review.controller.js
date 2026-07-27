import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import reviewService from "./review.service.js";

// ========================================
// CREATE REVIEW
// ========================================

const createReview = asyncHandler(async (req, res) => {
  const review =
    await reviewService.createReview(
      req.body,
      req.user.id
    );

  return res.status(201).json(
    new ApiResponse(
      201,
      review,
      "Review submitted successfully"
    )
  );
});

// ========================================
// GET REVIEW BY ID
// ========================================

const getReviewById = asyncHandler(async (req, res) => {
  const review =
    await reviewService.getReviewById(
      req.params.id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      review,
      "Review fetched successfully"
    )
  );
});

// ========================================
// GET ALL REVIEWS
// ========================================

const getAllReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip =
    (Number(page) - 1) * Number(limit);

  const take = Number(limit);

  const reviews =
    await reviewService.getAllReviews(
      skip,
      take
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      reviews,
      "Reviews fetched successfully"
    )
  );
});

// ========================================
// OWNER REPLY
// ========================================

const replyReview = asyncHandler(async (req, res) => {
  const review =
    await reviewService.replyReview(
      req.params.id,
      req.body.ownerReply
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      review,
      "Reply added successfully"
    )
  );
});

export {
  createReview,
  getReviewById,
  getAllReviews,
  replyReview,
};