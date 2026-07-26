import { z } from "zod";

export const createBookingSchema = z.object({
  pickupLocation: z.string().trim().min(3).max(255),

  dropLocation: z.string().trim().min(3).max(255),

  pickupDate: z.string().date(),

  pickupTime: z.string(),

  passengers: z.number().int().min(1).max(8),

  luggage: z.number().int().min(0).max(10).optional(),

  specialInstructions: z.string().trim().max(500).optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
  ]),
});