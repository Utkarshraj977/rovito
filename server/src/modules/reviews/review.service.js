import reviewRepository from "./review.repository.js";
import bookingRepository from "../bookings/booking.repository.js";
import ApiError from "../../utils/apiError.js";

// ========================================
// CREATE REVIEW (CUSTOMER)
// ========================================

const createReview = async (
  reviewData,
  customerId
) => {
  const booking =
    await bookingRepository.findBookingById(
      reviewData.bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // Customer can review only own booking
  if (booking.customerId !== customerId) {
    throw new ApiError(
      403,
      "You can review only your own booking"
    );
  }

  // Booking must be completed
  if (booking.bookingStatus !== "COMPLETED") {
    throw new ApiError(
      400,
      "Review can be submitted only after trip completion"
    );
  }

  // Only one review per booking
  const existingReview =
    await reviewRepository.findReviewByBookingId(
      reviewData.bookingId
    );

  if (existingReview) {
    throw new ApiError(
      409,
      "Review already submitted"
    );
  }

  return reviewRepository.createReview({
    ...reviewData,
    customerId,
  });
};

// ========================================
// GET REVIEW BY ID
// ========================================

const getReviewById = async (reviewId) => {
  const review =
    await reviewRepository.findReviewById(
      reviewId
    );

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  return review;
};

// ========================================
// GET ALL REVIEWS
// ========================================

const getAllReviews = async (
  skip,
  take
) => {
  return reviewRepository.getReviews(
    skip,
    take
  );
};

// ========================================
// OWNER REPLY
// ========================================

const replyReview = async (
  reviewId,
  ownerReply
) => {
  const review =
    await reviewRepository.findReviewById(
      reviewId
    );

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  return reviewRepository.updateReview(
    reviewId,
    {
      ownerReply,
    }
  );
};

export default {
  createReview,
  getReviewById,
  getAllReviews,
  replyReview,
};