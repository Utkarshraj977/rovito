import { Router } from "express";

import {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
} from "./vehicle.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.js";


const router = Router();


router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  createVehicle
);


router.get(
  "/",
  authenticate,
  getAllVehicles
);


router.get(
  "/:id",
  authenticate,
  getVehicleById
);


router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  updateVehicle
);


router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  deleteVehicle
);


export default router;