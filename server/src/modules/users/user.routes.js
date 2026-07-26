import { Router } from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import authorizeRole from "../../middlewares/role.middleware.js";

import userController from "./user.controller.js";



const router = Router();



// ============================
// CUSTOMER PROFILE
// ============================



// Get own profile
router.get(
  "/profile",
  authenticate,
  userController.getUserProfile
);




// Update own profile
router.patch(
  "/profile",
  authenticate,
  userController.updateProfile
);

// ============================
// OWNER CUSTOMER MANAGEMENT
// ============================



// Get all customers
router.get(

  "/customers",

  authenticate,

  authorizeRole("OWNER"),

  userController.getAllCustomers

);

// Get customer details

router.get(

  "/customers/:id",

  authenticate,

  authorizeRole("OWNER"),

  userController.getCustomerById

);

// Enable / Disable customer

router.patch(

  "/customers/:id/status",

  authenticate,

  authorizeRole("OWNER"),

  userController.updateCustomerStatus

);

export default router;