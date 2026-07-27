import { z } from "zod";

// ========================================
// CREATE CHECKOUT SESSION
// ========================================

export const createCheckoutSessionSchema =
  z.object({

    bookingId: z
      .string()
      .uuid(),

    paymentMethod: z.enum([
      "CARD",
      "APPLE_PAY",
      "GOOGLE_PAY",
      "BANK_TRANSFER",
      "CASH",
    ]),
  });

// ========================================
// VERIFY PAYMENT (Development)
// ========================================

export const verifyPaymentSchema =
  z.object({

    sessionId: z
      .string()
      .trim()
      .min(1),
  });

// ========================================
// UPDATE PAYMENT STATUS (OWNER)
// ========================================

export const updatePaymentStatusSchema =
  z.object({

    paymentStatus: z.enum([
      "PENDING",
      "AUTHORIZED",
      "PAID",
      "FAILED",
      "CANCELLED",
      "REFUNDED",
      "PARTIALLY_REFUNDED",
    ]),
  });