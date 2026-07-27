import { Router } from "express";

import {
  getOwnerDashboard,
  getCustomerDashboard,
} from "./dashboard.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

import { ROLES } from "../../constants/roles.js";

const router = Router();

// ========================================
// OWNER DASHBOARD
// ========================================

router.get(
  "/owner",
  authenticate,
  authorize(ROLES.OWNER),
  getOwnerDashboard
);

// ========================================
// CUSTOMER DASHBOARD
// ========================================

router.get(
  "/customer",
  authenticate,
  authorize(ROLES.CUSTOMER),
  getCustomerDashboard
);

export default router;