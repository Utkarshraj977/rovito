import { z } from "zod";

// ========================================
// CREATE BOOKING
// ========================================

export const createBookingSchema = z.object({

  tripType: z.enum([
    "ONE_WAY",
    "ROUND_TRIP",
  ]),

  pickupAddress: z
    .string()
    .trim()
    .min(5)
    .max(255),

  dropoffAddress: z
    .string()
    .trim()
    .min(5)
    .max(255),

  pickupDate: z.coerce.date(),

  pickupTime: z.coerce.date(),

  passengerCount: z
    .number()
    .int()
    .min(1)
    .max(8),

  luggageCount: z
    .number()
    .int()
    .min(0)
    .max(10)
    .optional(),

  specialInstructions: z
    .string()
    .trim()
    .max(500)
    .optional(),

  estimatedFare: z
    .number()
    .positive(),

});

// ========================================
// REJECT BOOKING
// ========================================

export const rejectBookingSchema = z.object({

  reason: z
    .string()
    .trim()
    .min(3)
    .max(300),

});

// ========================================
// CANCEL BOOKING
// ========================================

export const cancelBookingSchema = z.object({

  reason: z
    .string()
    .trim()
    .min(3)
    .max(300),

});

// ========================================
// ASSIGN VEHICLE
// ========================================

export const assignVehicleSchema = z.object({

  vehicleId: z
    .string()
    .uuid(),

});

// ========================================
// COMPLETE BOOKING
// ========================================

// No request body required
export const completeBookingSchema = z.object({});