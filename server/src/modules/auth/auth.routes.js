import { Router } from "express";

import {
  register,
  login,
  logout,
  getMe,
  changePassword,
  updateProfile
} from "./auth.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validation.middleware.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  updateProfileSchema
} from "./auth.validation.js";


const router = Router();


router.post(
  "/register",
  validate(registerSchema),
  register
);


router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post("/logout", logout);
router.get("/me", authenticate, getMe);

router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePassword
);

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  updateProfile
);


export default router;