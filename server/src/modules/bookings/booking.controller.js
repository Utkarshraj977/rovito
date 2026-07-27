import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import getPagination from "../../utils/pagination.js";
import bookingService from "./booking.service.js";

// ========================================
// CREATE BOOKING (CUSTOMER)
// ========================================

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

// ========================================
// GET BOOKING BY ID
// ========================================

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(
    req.params.id,
    req.user
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking fetched successfully"
    )
  );
});

// ========================================
// GET ALL BOOKINGS (OWNER)
// ========================================

const getAllBookings = asyncHandler(async (req, res) => {
  const { skip, take } = getPagination(
    req.query.page,
    req.query.limit
  );

  const bookings =
    await bookingService.getAllBookings(skip, take);

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings,
      "Bookings fetched successfully"
    )
  );
});

// ========================================
// GET MY BOOKINGS (CUSTOMER)
// ========================================

const getMyBookings = asyncHandler(async (req, res) => {
  const bookings =
    await bookingService.getMyBookings(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings,
      "My bookings fetched successfully"
    )
  );
});

// ========================================
// ACCEPT BOOKING (OWNER)
// ========================================

const acceptBooking = asyncHandler(async (req, res) => {
  const booking =
    await bookingService.acceptBooking(
      req.params.id,
      req.user.id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking accepted successfully"
    )
  );
});

// ========================================
// REJECT BOOKING (OWNER)
// ========================================

const rejectBooking = asyncHandler(async (req, res) => {
  const booking =
    await bookingService.rejectBooking(
      req.params.id,
      req.user.id,
      req.body.reason
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking rejected successfully"
    )
  );
});

// ========================================
// CANCEL BOOKING (CUSTOMER)
// ========================================

const cancelBooking = asyncHandler(async (req, res) => {
  const booking =
    await bookingService.cancelBooking(
      req.params.id,
      req.user.id,
      req.body.reason
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking cancelled successfully"
    )
  );
});

// ========================================
// ASSIGN VEHICLE (OWNER)
// ========================================

const assignVehicle = asyncHandler(async (req, res) => {
  const booking =
    await bookingService.assignVehicle(
      req.params.id,
      req.body.vehicleId,
      req.user.id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Vehicle assigned successfully"
    )
  );
});

// ========================================
// COMPLETE BOOKING (OWNER)
// ========================================

const completeBooking = asyncHandler(async (req, res) => {
  const booking =
    await bookingService.completeBooking(
      req.params.id,
      req.user.id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      booking,
      "Booking completed successfully"
    )
  );
});

export {
  createBooking,
  getBookingById,
  getAllBookings,
  getMyBookings,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  assignVehicle,
  completeBooking,
};