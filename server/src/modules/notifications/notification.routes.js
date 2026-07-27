import { Router } from "express";

import {
  getMyNotifications,
  markAsRead,
  getUnreadCount,
} from "./notification.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import {
  markNotificationReadSchema,
} from "./notification.validation.js";

const router = Router();

// ========================================
// GET MY NOTIFICATIONS
// ========================================

router.get(
  "/",
  authenticate,
  getMyNotifications
);

// ========================================
// GET UNREAD COUNT
// ========================================

router.get(
  "/unread-count",
  authenticate,
  getUnreadCount
);

// ========================================
// MARK AS READ
// ========================================

router.patch(
  "/:id/read",
  authenticate,
  markAsRead
);

export default router;