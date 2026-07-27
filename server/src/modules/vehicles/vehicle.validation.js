import { z } from "zod";

// ========================================
// CREATE VEHICLE
// ========================================

export const createVehicleSchema = z.object({
  displayName: z.string().trim().min(2).max(100),

  make: z.string().trim().min(2).max(50),

  model: z.string().trim().min(1).max(50),

  modelYear: z.number().int().min(2000).max(2100),

  registrationNumber: z
    .string()
    .trim()
    .min(3)
    .max(30),

  vehicleType: z.enum([
    "SEDAN",
    "SUV",
    "MINIVAN",
    "LUXURY",
    "WHEELCHAIR_ACCESSIBLE",
  ]),

  transmissionType: z.enum([
    "AUTOMATIC",
    "MANUAL",
  ]),

  fuelType: z.enum([
    "PETROL",
    "DIESEL",
    "HYBRID",
    "ELECTRIC",
  ]),

  passengerCapacity: z
    .number()
    .int()
    .min(1)
    .max(20),

  luggageCapacity: z
    .number()
    .int()
    .min(0)
    .max(20)
    .optional(),

  color: z
    .string()
    .trim()
    .max(30)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

// ========================================
// UPDATE VEHICLE
// ========================================

export const updateVehicleSchema =
  createVehicleSchema.partial();

// ========================================
// UPDATE AVAILABILITY STATUS
// ========================================

export const updateAvailabilityStatusSchema =
  z.object({
    availabilityStatus: z.enum([
      "AVAILABLE",
      "RESERVED",
      "ON_TRIP",
    ]),
  });

// ========================================
// UPDATE OPERATIONAL STATUS
// ========================================

export const updateOperationalStatusSchema =
  z.object({
    operationalStatus: z.enum([
      "ACTIVE",
      "MAINTENANCE",
      "OUT_OF_SERVICE",
    ]),
  });