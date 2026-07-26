import  prisma from "../../config/prisma.js";

const createBooking = async (bookingData) => {
  return prisma.booking.create({
    data: bookingData,
  });
};

const findBookingById = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
  });
};

const getBookings = async (skip, take) => {
  return prisma.booking.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateBooking = async (id, data) => {
  return prisma.booking.update({
    where: { id },
    data,
  });
};

const deleteBooking = async (id) => {
  return prisma.booking.delete({
    where: { id },
  });
};

export default {
  createBooking,
  findBookingById,
  getBookings,
  updateBooking,
  deleteBooking,
};