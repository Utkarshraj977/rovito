import { Router } from "express";

import {
  createReview,
  getReviewById,
  getAllReviews,
  replyReview,
} from "./review.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import  ROLES  from "../../constants/roles.js";

import { 
  createReviewSchema,
  replyReviewSchema,
} from "./review.validation.js";

const router = Router();

// ========================================
// CREATE REVIEW (CUSTOMER)
// ========================================

router.post(
  "/",
  authenticate,
  authorize(ROLES.CUSTOMER),
  validate(createReviewSchema),
  createReview
);

// ========================================
// GET ALL REVIEWS
// ========================================

router.get(
  "/",
  getAllReviews
);

// ========================================
// GET REVIEW BY ID
// ========================================

router.get(
  "/:id",
  getReviewById
);

// ========================================
// OWNER REPLY
// ========================================

router.patch(
  "/:id/reply",
  authenticate,
  authorize(ROLES.OWNER),
  validate(replyReviewSchema),
  replyReview
);

export default router;
