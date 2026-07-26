import bookingRepository from "./booking.repository.js";
import ApiError from "../../utils/apiError.js";
import generateBookingId from "../../utils/generateBookingId.js";


const createBooking = async (bookingData, userId) => {
  const booking = await bookingRepository.createBooking({
    ...bookingData,
    userId,
    bookingId: generateBookingId(),
  });

  return booking;
};


const getBookingById = async (bookingId) => {
  const booking = await bookingRepository.findBookingById(
    bookingId
  );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};


const getAllBookings = async (skip, take) => {
  return bookingRepository.getBookings(skip, take);
};


const updateBooking = async (bookingId, data) => {
  const booking = await bookingRepository.findBookingById(
    bookingId
  );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return bookingRepository.updateBooking(
    bookingId,
    data
  );
};


const cancelBooking = async (bookingId) => {
  const booking = await bookingRepository.findBookingById(
    bookingId
  );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return bookingRepository.updateBooking(
    bookingId,
    {
      status: "CANCELLED",
    }
  );
};


export default {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  cancelBooking,
};