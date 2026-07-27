import paymentRepository from "./payment.repository.js";
import bookingRepository from "../bookings/booking.repository.js";
import paymentGateway from "./payment.gateway.js";

import ApiError from "../../utils/apiError.js";

// ========================================
// CREATE CHECKOUT SESSION
// ========================================

const createCheckoutSession = async (
  bookingId,
  customerId,
  paymentMethod = "CARD"
) => {

  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(
      404,
      "Booking not found"
    );
  }

  if (booking.customerId !== customerId) {
    throw new ApiError(
      403,
      "You are not allowed to pay for this booking"
    );
  }

  if (booking.bookingStatus !== "ACCEPTED") {
    throw new ApiError(
      400,
      "Only accepted bookings can be paid"
    );
  }

  const existingPayment =
    await paymentRepository.findPaymentByBookingId(
      bookingId
    );

  if (existingPayment) {
    throw new ApiError(
      409,
      "Payment already exists for this booking"
    );
  }

  const payment =
    await paymentRepository.createPayment({
      bookingId,

      gateway: "STRIPE",

      paymentMethod,

      amount: booking.estimatedFare,

      currency: "CAD",

      paymentStatus: "PENDING",
    });

  const session =
    await paymentGateway.createCheckoutSession({
      bookingId: booking.id,

      bookingReference:
        booking.bookingReference,

      amount: booking.estimatedFare,
    });

  await paymentRepository.updatePayment(
    payment.id,
    {
      transactionId: session.id,
    }
  );

  await bookingRepository.updateBooking(
    booking.id,
    {
      bookingStatus:
        "PAYMENT_PENDING",
    }
  );

  await bookingRepository.createStatusHistory(
    {
      bookingId: booking.id,

      status: "PAYMENT_PENDING",

      changedByUserId: customerId,

      remarks:
        "Waiting for payment",
    }
  );

  return {
    paymentId: payment.id,

    checkoutUrl: session.url,

    sessionId: session.id,
  };
};

// ========================================
// GET PAYMENT
// ========================================

const getPaymentByBooking = async (
  bookingId,
  currentUser
) => {

  const payment =
    await paymentRepository.findPaymentByBookingId(
      bookingId
    );

  if (!payment) {
    throw new ApiError(
      404,
      "Payment not found"
    );
  }

  if (
    currentUser.role === "CUSTOMER" &&
    payment.booking.customerId !==
      currentUser.id
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  return payment;
};

// ========================================
// GET ALL PAYMENTS
// ========================================

const getAllPayments = async (
  skip,
  take
) => {
  return paymentRepository.getPayments(
    skip,
    take
  );
};

// ========================================
// HANDLE SUCCESSFUL PAYMENT
// ========================================

const markPaymentSuccessful =
  async (sessionId) => {

    const session =
      await paymentGateway.getCheckoutSession(
        sessionId
      );

    const payment =
      await paymentRepository.findPaymentByBookingId(
        session.metadata.bookingId
      );

    if (!payment) {
      throw new ApiError(
        404,
        "Payment not found"
      );
    }

    if (
      payment.paymentStatus ===
      "PAID"
    ) {
      return payment;
    }

    await paymentRepository.updatePayment(
      payment.id,
      {
        paymentStatus: "PAID",

        paidAt: new Date(),

        gatewayResponse: session,
      }
    );

    await bookingRepository.updateBooking(
      payment.bookingId,
      {
        bookingStatus:
          "CONFIRMED",
      }
    );

    await bookingRepository.createStatusHistory(
      {
        bookingId:
          payment.bookingId,

        status: "CONFIRMED",

        changedByUserId:
          payment.booking.customerId,

        remarks:
          "Payment successful",
      }
    );

    return paymentRepository.findPaymentById(
      payment.id
    );
  };

export default {

  createCheckoutSession,

  getPaymentByBooking,

  getAllPayments,

  markPaymentSuccessful,

};
