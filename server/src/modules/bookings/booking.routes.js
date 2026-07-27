import { Router } from "express";

import {
  createBooking,
  getBookingById,
  getAllBookings,
  getMyBookings,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  assignVehicle,
  completeBooking,
} from "./booking.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import { ROLES } from "../../constants/roles.js";

import {
  createBookingSchema,
  rejectBookingSchema,
  cancelBookingSchema,
  assignVehicleSchema,
  completeBookingSchema,
} from "./booking.validation.js";

const router = Router();

// ========================================
// CUSTOMER ROUTES
// ========================================

// Create Booking
router.post(
  "/",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(createBookingSchema),
  createBooking
);

// Get My Bookings
router.get(
  "/my",
  authenticate,
  authorize(ROLES.CUSTOMER),
  getMyBookings
);

// Get Booking By ID
router.get(
  "/:id",
  authenticate,
  getBookingById
);

// Cancel Booking
router.patch(
  "/:id/cancel",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(cancelBookingSchema),
  cancelBooking
);

// ========================================
// OWNER ROUTES
// ========================================

// Get All Bookings
router.get(
  "/",
  authenticate,
  authorize(ROLES.OWNER),
  getAllBookings
);

// Accept Booking
router.patch(
  "/:id/accept",
  authenticate,
  authorize(ROLES.OWNER),
  acceptBooking
);

// Reject Booking
router.patch(
  "/:id/reject",
  authenticate,
  authorize(ROLES.OWNER),
  validate(rejectBookingSchema),
  rejectBooking
);

// Assign Vehicle
router.patch(
  "/:id/assign-vehicle",
  authenticate,
  authorize(ROLES.OWNER),
  validate(assignVehicleSchema),
  assignVehicle
);

// Complete Booking
router.patch(
  "/:id/complete",
  authenticate,
  authorize(ROLES.OWNER),
  validate(completeBookingSchema),
  completeBooking
);

export default router;