import prisma from "../../config/prisma.js";

// ========================================
// OWNER DASHBOARD
// ========================================

const getOwnerDashboard = async () => {
  const [
    totalBookings,
    pendingBookings,
    acceptedBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,

    totalVehicles,
    availableVehicles,
    reservedVehicles,
    onTripVehicles,
    maintenanceVehicles,

    totalRevenue,

    recentBookings,
  ] = await Promise.all([
    // Booking Counts
    prisma.booking.count(),

    prisma.booking.count({
      where: {
        bookingStatus: "PENDING",
      },
    }),

    prisma.booking.count({
      where: {
        bookingStatus: "ACCEPTED",
      },
    }),

    prisma.booking.count({
      where: {
        bookingStatus: "CONFIRMED",
      },
    }),

    prisma.booking.count({
      where: {
        bookingStatus: "COMPLETED",
      },
    }),

    prisma.booking.count({
      where: {
        bookingStatus: "CANCELLED",
      },
    }),

    // Vehicle Counts
    prisma.vehicle.count(),

    prisma.vehicle.count({
      where: {
        availabilityStatus: "AVAILABLE",
      },
    }),

    prisma.vehicle.count({
      where: {
        availabilityStatus: "RESERVED",
      },
    }),

    prisma.vehicle.count({
      where: {
        availabilityStatus: "ON_TRIP",
      },
    }),

    prisma.vehicle.count({
      where: {
        operationalStatus: "MAINTENANCE",
      },
    }),

    // Revenue
    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        paymentStatus: "PAID",
      },
    }),

    // Recent Bookings
    prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    }),
  ]);

  return {
    totalBookings,
    pendingBookings,
    acceptedBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,

    totalVehicles,
    availableVehicles,
    reservedVehicles,
    onTripVehicles,
    maintenanceVehicles,

    totalRevenue:
      totalRevenue._sum.amount ?? 0,

    recentBookings,
  };
};

// ========================================
// CUSTOMER DASHBOARD
// ========================================

const getCustomerDashboard = async (
  customerId
) => {
  const [
    totalBookings,
    upcomingBookings,
    completedTrips,
    cancelledTrips,

    unreadNotifications,

    latestBooking,
  ] = await Promise.all([
    prisma.booking.count({
      where: {
        customerId,
      },
    }),

    prisma.booking.count({
      where: {
        customerId,
        bookingStatus: {
          in: [
            "PENDING",
            "ACCEPTED",
            "CONFIRMED",
            "VEHICLE_ASSIGNED",
          ],
        },
      },
    }),

    prisma.booking.count({
      where: {
        customerId,
        bookingStatus: "COMPLETED",
      },
    }),

    prisma.booking.count({
      where: {
        customerId,
        bookingStatus: "CANCELLED",
      },
    }),

    prisma.notification.count({
      where: {
        userId: customerId,
        status: "SENT",
      },
    }),

    prisma.booking.findFirst({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    totalBookings,
    upcomingBookings,
    completedTrips,
    cancelledTrips,

    unreadNotifications,

    latestBooking,
  };
};

export default {
  getOwnerDashboard,
  getCustomerDashboard,
};