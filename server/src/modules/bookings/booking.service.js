import bookingRepository from "./booking.repository.js";
import notificationService from "../notifications/notification.service.js";
import ApiError from "../../utils/apiError.js";
import generateBookingId from "../../utils/generateBookingId.js";

// ========================================
// CREATE BOOKING (CUSTOMER)
// ========================================

const createBooking = async (bookingData, customerId) => {
  const booking = await bookingRepository.createBooking({
    ...bookingData,
    customerId,
    bookingReference: generateBookingId(),
    bookingStatus: "PENDING",
  });

  await bookingRepository.createStatusHistory({
    bookingId: booking.id,
    status: "PENDING",
    changedByUserId: customerId,
    remarks: "Booking request created",
  });

  // Notification
  await notificationService.createNotification({
    userId: customerId,
    bookingId: booking.id,
    title: "Booking Created",
    message:
      "Your booking request has been submitted successfully.",
  });

  return booking;
};

// ========================================
// GET BOOKING BY ID
// ========================================

const getBookingById = async (
  bookingId,
  currentUser
) => {
  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (
    currentUser.role === "CUSTOMER" &&
    booking.customerId !== currentUser.id
  ) {
    throw new ApiError(
      403,
      "You are not allowed to access this booking"
    );
  }

  return booking;
};

// ========================================
// GET ALL BOOKINGS (OWNER)
// ========================================

const getAllBookings = async (skip, take) => {
  return bookingRepository.getAllBookings(
    skip,
    take
  );
};

// ========================================
// GET MY BOOKINGS (CUSTOMER)
// ========================================

const getMyBookings = async (customerId) => {
  return bookingRepository.getCustomerBookings(
    customerId
  );
};

// ========================================
// ACCEPT BOOKING (OWNER)
// ========================================

const acceptBooking = async (
  bookingId,
  ownerId
) => {
  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.bookingStatus !== "PENDING") {
    throw new ApiError(
      400,
      "Only pending bookings can be accepted"
    );
  }

  const updatedBooking =
    await bookingRepository.updateBooking(
      bookingId,
      {
        bookingStatus: "ACCEPTED",
      }
    );

  await bookingRepository.createStatusHistory({
    bookingId,
    status: "ACCEPTED",
    changedByUserId: ownerId,
    remarks: "Booking accepted",
  });

  // Notification
  await notificationService.createNotification({
    userId: booking.customerId,
    bookingId,
    title: "Booking Accepted",
    message:
      "Your booking has been accepted. Please complete your payment.",
  });

  return updatedBooking;
};

// ========================================
// REJECT BOOKING (OWNER)
// ========================================

const rejectBooking = async (
  bookingId,
  ownerId,
  reason
) => {
  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.bookingStatus !== "PENDING") {
    throw new ApiError(
      400,
      "Only pending bookings can be rejected"
    );
  }

  const updatedBooking =
    await bookingRepository.updateBooking(
      bookingId,
      {
        bookingStatus: "REJECTED",
        cancellationReason: reason,
        cancelledBy: "OWNER",
      }
    );

  await bookingRepository.createStatusHistory({
    bookingId,
    status: "REJECTED",
    changedByUserId: ownerId,
    remarks: reason || "Booking rejected",
  });

  // Notification
  await notificationService.createNotification({
    userId: booking.customerId,
    bookingId,
    title: "Booking Rejected",
    message:
      reason ||
      "Sorry, your booking request has been rejected.",
  });

  return updatedBooking;
};

// ========================================
// CANCEL BOOKING (CUSTOMER)
// ========================================

const cancelBooking = async (
  bookingId,
  customerId,
  reason
) => {
  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // Customer can cancel only own booking
  if (booking.customerId !== customerId) {
    throw new ApiError(
      403,
      "You can cancel only your own booking"
    );
  }

  if (booking.bookingStatus === "COMPLETED") {
    throw new ApiError(
      400,
      "Completed booking cannot be cancelled"
    );
  }

  if (booking.bookingStatus === "CANCELLED") {
    throw new ApiError(
      400,
      "Booking already cancelled"
    );
  }

  if (booking.bookingStatus === "REJECTED") {
    throw new ApiError(
      400,
      "Rejected booking cannot be cancelled"
    );
  }

  const updatedBooking =
    await bookingRepository.updateBooking(
      bookingId,
      {
        bookingStatus: "CANCELLED",
        cancelledBy: "CUSTOMER",
        cancellationReason: reason,
      }
    );

  await bookingRepository.createStatusHistory({
    bookingId,
    status: "CANCELLED",
    changedByUserId: customerId,
    remarks: reason || "Booking cancelled",
  });

  // Notification
  await notificationService.createNotification({
    userId: customerId,
    bookingId,
    title: "Booking Cancelled",
    message:
      reason ||
      "Your booking has been cancelled successfully.",
  });

  return updatedBooking;
};

// ========================================
// ASSIGN VEHICLE (OWNER)
// ========================================

const assignVehicle = async (
  bookingId,
  vehicleId,
  ownerId
) => {
  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const updatedBooking =
    await bookingRepository.updateBooking(
      bookingId,
      {
        vehicleId,
        bookingStatus: "VEHICLE_ASSIGNED",
      }
    );

  await bookingRepository.createStatusHistory({
    bookingId,
    status: "VEHICLE_ASSIGNED",
    changedByUserId: ownerId,
    remarks: "Vehicle assigned",
  });

  // Notification
  await notificationService.createNotification({
    userId: booking.customerId,
    bookingId,
    title: "Vehicle Assigned",
    message:
      "A vehicle has been assigned to your booking.",
  });

  return updatedBooking;
};

// ========================================
// COMPLETE BOOKING (OWNER)
// ========================================

const completeBooking = async (
  bookingId,
  ownerId
) => {
  const booking =
    await bookingRepository.findBookingById(
      bookingId
    );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (
    booking.bookingStatus !== "CONFIRMED" &&
    booking.bookingStatus !== "VEHICLE_ASSIGNED" &&
    booking.bookingStatus !== "IN_PROGRESS"
  ) {
    throw new ApiError(
      400,
      "Booking cannot be completed"
    );
  }

  const updatedBooking =
    await bookingRepository.updateBooking(
      bookingId,
      {
        bookingStatus: "COMPLETED",
      }
    );

  await bookingRepository.createStatusHistory({
    bookingId,
    status: "COMPLETED",
    changedByUserId: ownerId,
    remarks: "Trip completed",
  });

  // Notification
  await notificationService.createNotification({
    userId: booking.customerId,
    bookingId,
    title: "Trip Completed",
    message:
      "Thank you for travelling with Victoria Taxi.",
  });

  return updatedBooking;
};

export default {
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
