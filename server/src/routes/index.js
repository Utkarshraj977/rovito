import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import bookingRoutes from "../modules/bookings/booking.routes.js";
import vehicleRoutes from "../modules/vehicles/vehicle.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";
import reviewRoutes from "../modules/reviews/review.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";

const router = Router(); 

// ========================================
// API ROUTES
// ========================================

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/bookings", bookingRoutes);

router.use("/vehicles", vehicleRoutes);

router.use("/payments", paymentRoutes);

router.use("/notifications",notificationRoutes);

router.use("/reviews", reviewRoutes);

router.use("/dashboard", dashboardRoutes);

export default router;
