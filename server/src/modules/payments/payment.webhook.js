import Stripe from "stripe";

import paymentService from "./payment.service.js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

// ========================================
// STRIPE WEBHOOK
// ========================================

const stripeWebhook = async (
  req,
  res
) => {

  const signature =
    req.headers["stripe-signature"];

  let event;

  try {

    event =
      stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

  } catch (error) {

    return res.status(400).send(
      `Webhook Error: ${error.message}`
    );
  }

  switch (event.type) {

    // ===============================
    // PAYMENT SUCCESS
    // ===============================

    case "checkout.session.completed":

      await paymentService.markPaymentSuccessful(
        event.data.object.id
      );

      break;

    // ===============================
    // PAYMENT FAILED
    // ===============================

    case "checkout.session.expired":

      console.log(
        "Checkout session expired"
      );

      break;

    default:

      console.log(
        `Unhandled event: ${event.type}`
      );
  }

  return res.json({
    received: true,
  });
};

export default stripeWebhook;