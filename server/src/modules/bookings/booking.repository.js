import prisma from "../../config/prisma.js";

// ========================================
// CREATE BOOKING
// ========================================

const createBooking = (bookingData) => {
  return prisma.booking.create({
    data: bookingData,

    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },

      vehicle: true,

      payment: true,
    },
  });
};

// ========================================
// GET BOOKING BY ID
// ========================================

const findBookingById = (id) => {
  return prisma.booking.findUnique({
    where: { id },

    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },

      vehicle: true,

      payment: true,

      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

// ========================================
// GET ALL BOOKINGS (OWNER)
// ========================================

const getAllBookings = (skip, take) => {
  return prisma.booking.findMany({
    skip,
    take,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
        },
      },

      vehicle: {
        select: {
          id: true,
          registrationNumber: true,
          make: true,
          model: true,
        },
      },

      payment: {
        select: {
          paymentStatus: true,
          paymentMethod: true,
          amount: true,
        },
      },
    },
  });
};

// ========================================
// GET CUSTOMER BOOKINGS
// ========================================

const getCustomerBookings = (customerId) => {
  return prisma.booking.findMany({
    where: {
      customerId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      vehicle: true,

      payment: true,
    },
  });
};

// ========================================
// UPDATE BOOKING
// ========================================

const updateBooking = (id, data) => {
  return prisma.booking.update({
    where: {
      id,
    },

    data,

    include: {
      customer: true,

      vehicle: true,

      payment: true,
    },
  });
};

// ========================================
// CREATE STATUS HISTORY
// ========================================

const createStatusHistory = (data) => {
  return prisma.bookingStatusHistory.create({
    data,
  });
};

export default {
  createBooking,
  findBookingById,
  getAllBookings,
  getCustomerBookings,
  updateBooking,
  createStatusHistory,
};