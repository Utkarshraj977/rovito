import { Router } from "express";

import {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  updateAvailabilityStatus,
  updateOperationalStatus,
} from "./vehicle.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import { ROLES } from "../../constants/roles.js";

import {
  createVehicleSchema,
  updateVehicleSchema,
  updateAvailabilityStatusSchema,
  updateOperationalStatusSchema,
} from "./vehicle.validation.js";

const router = Router();

// ========================================
// CREATE VEHICLE (OWNER)
// ========================================

router.post(
  "/",
  authenticate,
  authorize(ROLES.OWNER),
  validate(createVehicleSchema),
  createVehicle
);

// ========================================
// GET ALL VEHICLES
// ========================================

router.get(
  "/",
  authenticate,
  getAllVehicles
);

// ========================================
// GET VEHICLE BY ID
// ========================================

router.get(
  "/:id",
  authenticate,
  getVehicleById
);

// ========================================
// UPDATE VEHICLE
// ========================================

router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.OWNER),
  validate(updateVehicleSchema),
  updateVehicle
);

// ========================================
// UPDATE AVAILABILITY STATUS
// ========================================

router.patch(
  "/:id/availability",
  authenticate,
  authorize(ROLES.OWNER),
  validate(updateAvailabilityStatusSchema),
  updateAvailabilityStatus
);

// ========================================
// UPDATE OPERATIONAL STATUS
// ========================================

router.patch(
  "/:id/operational-status",
  authenticate,
  authorize(ROLES.OWNER),
  validate(updateOperationalStatusSchema),
  updateOperationalStatus
);

export default router;