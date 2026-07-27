import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: "2025-06-30.basil",
  }
);

// ========================================
// CREATE CHECKOUT SESSION
// ========================================

const createCheckoutSession = async ({
  bookingId,
  bookingReference,
  amount,
  currency = "cad",
}) => {
  const session =
    await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency,

            unit_amount: Math.round(
              Number(amount) * 100
            ),

            product_data: {
              name: `Taxi Booking ${bookingReference}`,

              description:
                "Victoria Taxi Booking",
            },
          },
        },
      ],

      metadata: {
        bookingId,
      },

      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

  return session;
};

// ========================================
// GET CHECKOUT SESSION
// ========================================

const getCheckoutSession = async (
  sessionId
) => {
  return stripe.checkout.sessions.retrieve(
    sessionId
  );
};

// ========================================
// CONSTRUCT WEBHOOK EVENT
// ========================================

const constructWebhookEvent = (
  body,
  signature
) => {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
};

export default {
  createCheckoutSession,
  getCheckoutSession,
  constructWebhookEvent,
};

