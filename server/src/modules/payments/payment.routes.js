import { Router } from "express";

import {
  createCheckoutSession,
  getPaymentByBooking,
  getAllPayments,
  verifyPayment,
} from "./payment.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import { ROLES } from "../../constants/roles.js";

import {
  createCheckoutSessionSchema,
  verifyPaymentSchema,
} from "./payment.validation.js";

const router = Router();

// ========================================
// CUSTOMER
// CREATE STRIPE CHECKOUT SESSION
// ========================================

router.post(
  "/checkout",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(createCheckoutSessionSchema),
  createCheckoutSession
);

// ========================================
// CUSTOMER / OWNER
// GET PAYMENT OF A BOOKING
// ========================================

router.get(
  "/booking/:bookingId",
  authenticate,
  getPaymentByBooking
);

// ========================================
// OWNER
// GET ALL PAYMENTS
// ========================================

router.get(
  "/",
  authenticate,
  authorize(ROLES.OWNER),
  getAllPayments
);

// ========================================
// DEVELOPMENT ONLY
// VERIFY PAYMENT MANUALLY
// ========================================

router.post(
  "/verify",
  authenticate,
  authorize(ROLES.OWNER),
  validate(verifyPaymentSchema),
  verifyPayment
);

export default router;