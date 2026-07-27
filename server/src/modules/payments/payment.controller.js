import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import paymentService from "./payment.service.js";

// ========================================
// CREATE CHECKOUT SESSION
// ========================================

const createCheckoutSession = asyncHandler(
  async (req, res) => {

    const payment =
      await paymentService.createCheckoutSession(
        req.body.bookingId,
        req.user.id,
        req.body.paymentMethod
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        payment,
        "Checkout session created successfully"
      )
    );
  }
);

// ========================================
// GET PAYMENT BY BOOKING
// ========================================

const getPaymentByBooking = asyncHandler(
  async (req, res) => {

    const payment =
      await paymentService.getPaymentByBooking(
        req.params.bookingId,
        req.user
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        payment,
        "Payment fetched successfully"
      )
    );
  }
);

// ========================================
// GET ALL PAYMENTS
// ========================================

const getAllPayments = asyncHandler(
  async (req, res) => {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const payments =
      await paymentService.getAllPayments(
        skip,
        limit
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        payments,
        "Payments fetched successfully"
      )
    );
  }
);

// ========================================
// VERIFY PAYMENT
// (For testing only)
// ========================================

const verifyPayment = asyncHandler(
  async (req, res) => {

    const payment =
      await paymentService.markPaymentSuccessful(
        req.body.sessionId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        payment,
        "Payment verified successfully"
      )
    );
  }
);

export {
  createCheckoutSession,
  getPaymentByBooking,
  getAllPayments,
  verifyPayment,
};