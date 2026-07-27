import prisma from "../../config/prisma.js";

// ========================================
// CREATE PAYMENT
// ========================================

const createPayment = async (paymentData) => {
  return prisma.payment.create({
    data: paymentData,
  });
};

// ========================================
// FIND PAYMENT BY ID
// ========================================

const findPaymentById = async (paymentId) => {
  return prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      booking: {
        select: {
          id: true,
          bookingReference: true,
          bookingStatus: true,
          estimatedFare: true,

          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });
};

// ========================================
// FIND PAYMENT BY BOOKING
// ========================================

const findPaymentByBookingId = async (
  bookingId
) => {
  return prisma.payment.findUnique({
    where: {
      bookingId,
    },

    include: {
      booking: true,
    },
  });
};

// ========================================
// GET ALL PAYMENTS
// ========================================

const getPayments = async (
  skip,
  take
) => {
  return prisma.payment.findMany({
    skip,
    take,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      booking: {
        select: {
          bookingReference: true,
          bookingStatus: true,

          customer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};

// ========================================
// UPDATE PAYMENT
// ========================================

const updatePayment = async (
  paymentId,
  data
) => {
  return prisma.payment.update({
    where: {
      id: paymentId,
    },

    data,
  });
};

// ========================================
// DELETE PAYMENT (Rarely Used)
// ========================================

const deletePayment = async (
  paymentId
) => {
  return prisma.payment.delete({
    where: {
      id: paymentId,
    },
  });
};

export default {
  createPayment,
  findPaymentById,
  findPaymentByBookingId,
  getPayments,
  updatePayment,
  deletePayment,
};
