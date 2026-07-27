import prisma from "../../config/prisma.js";

// ========================================
// CREATE NOTIFICATION
// ========================================

const createNotification = async (data) => {
  return prisma.notification.create({
    data,
  });
};

// ========================================
// GET USER NOTIFICATIONS
// ========================================

const getUserNotifications = async (
  userId,
  skip,
  take
) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      booking: {
        select: {
          id: true,
          bookingReference: true,
          bookingStatus: true,
        },
      },
    },
  });
};

// ========================================
// GET NOTIFICATION BY ID
// ========================================

const findNotificationById = async (id) => {
  return prisma.notification.findUnique({
    where: {
      id,
    },
    include: {
      booking: {
        select: {
          bookingReference: true,
        },
      },
    },
  });
};

// ========================================
// MARK AS READ
// ========================================

const updateNotification = async (
  id,
  data
) => {
  return prisma.notification.update({
    where: {
      id,
    },
    data,
  });
};

// ========================================
// UNREAD COUNT
// ========================================

const getUnreadCount = async (userId) => {
  return prisma.notification.count({
    where: {
      userId,
      status: "SENT",
    },
  });
};

export default {
  createNotification,
  getUserNotifications,
  findNotificationById,
  updateNotification,
  getUnreadCount,
};