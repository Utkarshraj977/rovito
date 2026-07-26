import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import bookingService from "./booking.service.js";


// Create Booking
const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking(
    req.body,
    req.user.id
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      booking,
      "Booking created successfully"
    )
  );
});


// Get Booking By ID
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking fetched successfully"
    )
  );
});


// Get All Bookings
const getAllBookings = asyncHandler(async (req, res) => {
  const { skip, take } = req.pagination;

  const bookings = await bookingService.getAllBookings(
    skip,
    take
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings,
      "Bookings fetched successfully"
    )
  );
});


// Update Booking
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.updateBooking(
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking updated successfully"
    )
  );
});


// Cancel Booking
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking cancelled successfully"
    )
  );
});


export {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  cancelBooking,
};