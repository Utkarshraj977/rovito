import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import pagination from "../../utils/pagination.js";
import notificationService from "./notification.service.js";

// ========================================
// GET MY NOTIFICATIONS
// ========================================

const getMyNotifications = asyncHandler(
  async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const take = limit;

    const notifications =
      await notificationService.getMyNotifications(
        req.user.id,
        skip,
        take
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        notifications,
        "Notifications fetched successfully"
      )
    );
  }
);
// ========================================
// MARK NOTIFICATION AS READ
// ========================================

const markAsRead = asyncHandler(
  async (req, res) => {
    const notification =
      await notificationService.markAsRead(
        req.params.id,
        req.user.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        notification,
        "Notification marked as read"
      )
    );
  }
);

// ========================================
// GET UNREAD COUNT
// ========================================

const getUnreadCount = asyncHandler(
  async (req, res) => {
    const count =
      await notificationService.getUnreadCount(
        req.user.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        count,
        "Unread notification count fetched successfully"
      )
    );
  }
);

export {
  getMyNotifications,
  markAsRead,
  getUnreadCount,
};