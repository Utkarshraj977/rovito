import { Router } from "express";

import {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  cancelBooking,
} from "./booking.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import { ROLES } from "../../constants/roles.js";
import { createBookingSchema } from "./booking.validation.js";


const router = Router();


router.post(
  "/",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(createBookingSchema),
  createBooking
);


router.get(
  "/:id",
  authenticate,
  getBookingById
);


router.get(
  "/",
  authenticate,
  getAllBookings
);


router.patch(
  "/:id",
  authenticate,
  updateBooking
);


router.patch(
  "/:id/cancel",
  authenticate,
  cancelBooking
);


export default router;