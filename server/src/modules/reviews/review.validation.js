import { z } from "zod";

// ========================================
// CREATE REVIEW
// ========================================

export const createReviewSchema = z.object({
  bookingId: z.string().uuid(),

  rating: z
    .number()
    .int()
    .min(1)
    .max(5),

  review: z
    .string()
    .trim()
    .max(1000)
    .optional(),
});

// ========================================
// OWNER REPLY
// ========================================

export const replyReviewSchema = z.object({
  ownerReply: z
    .string()
    .trim()
    .min(1)
    .max(1000),
});