import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import bookingRoutes from "../modules/bookings/booking.routes.js";
import vehicleRoutes from "../modules/vehicles/vehicle.routes.js";


const router = Router();



// API Routes

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/bookings", bookingRoutes);

router.use("/vehicles", vehicleRoutes);



export default router;