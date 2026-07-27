import prisma from "../../config/prisma.js";

// ========================================
// CREATE REVIEW
// ========================================

const createReview = async (reviewData) => {
  return prisma.review.create({
    data: reviewData,
  });
};

// ========================================
// FIND REVIEW BY ID
// ========================================

const findReviewById = async (id) => {
  return prisma.review.findUnique({
    where: { id },
    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      booking: {
        select: {
          bookingReference: true,
        },
      },
    },
  });
};

// ========================================
// FIND REVIEW BY BOOKING
// ========================================

const findReviewByBookingId = async (
  bookingId
) => {
  return prisma.review.findUnique({
    where: {
      bookingId,
    },
  });
};

// ========================================
// GET ALL REVIEWS
// ========================================

const getReviews = async (skip, take) => {
  return prisma.review.findMany({
    skip,
    take,
    where: {
      isVisible: true,
    },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ========================================
// UPDATE REVIEW
// ========================================

const updateReview = async (id, data) => {
  return prisma.review.update({
    where: { id },
    data,
  });
};

export default {
  createReview,
  findReviewById,
  findReviewByBookingId,
  getReviews,
  updateReview,
};