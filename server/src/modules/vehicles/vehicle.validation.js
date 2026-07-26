import { z } from "zod";

export const createVehicleSchema = z.object({
  vehicleName: z.string().trim().min(2).max(100),

  vehicleNumber: z.string().trim().min(3).max(20),

  vehicleType: z.string().trim().min(2).max(50),

  capacity: z.number().int().min(1).max(20),

  isAvailable: z.boolean().optional(),
});

export const updateVehicleSchema = createVehicleSchema.partial();