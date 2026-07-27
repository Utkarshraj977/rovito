import notificationRepository from "./notification.repository.js";
import ApiError from "../../utils/apiError.js";

// ========================================
// CREATE NOTIFICATION
// ========================================

const createNotification = async ({
  userId,
  bookingId = null,
  type = "IN_APP",
  title,
  message,
}) => {
  return notificationRepository.createNotification({
    userId,
    bookingId,
    type,
    title,
    message,
    status: "SENT",
    sentAt: new Date(),
  });
};

// ========================================
// GET MY NOTIFICATIONS
// ========================================

const getMyNotifications = async (
  userId,
  skip,
  take
) => {
  return notificationRepository.getUserNotifications(
    userId,
    skip,
    take
  );
};

// ========================================
// MARK AS READ
// ========================================

const markAsRead = async (
  notificationId,
  userId
) => {
  const notification =
    await notificationRepository.findNotificationById(
      notificationId
    );

  if (!notification) {
    throw new ApiError(
      404,
      "Notification not found"
    );
  }

  // Ownership Check
  if (notification.userId !== userId) {
    throw new ApiError(
      403,
      "You are not allowed to access this notification"
    );
  }

  // Already Read
  if (notification.status === "READ") {
    return notification;
  }

  return notificationRepository.updateNotification(
    notificationId,
    {
      status: "READ",
      readAt: new Date(),
    }
  );
};

// ========================================
// GET UNREAD COUNT
// ========================================

const getUnreadCount = async (userId) => {
  const count =
    await notificationRepository.getUnreadCount(
      userId
    );

  return {
    unreadCount: count,
  };
};

export default {
  createNotification,
  getMyNotifications,
  markAsRead,
  getUnreadCount,
};