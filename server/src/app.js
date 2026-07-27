import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env.js";

import apiRoutes from "./routes/index.js";
import stripeWebhook from "./modules/payments/payment.webhook.js";

import notFoundHandler from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// ========================================
// STRIPE WEBHOOK
// ========================================

app.post(
  "/api/v1/payments/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhook
);

// ========================================
// SECURITY
// ========================================

app.use(helmet());

// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// ========================================
// COMPRESSION
// ========================================

app.use(compression());

// ========================================
// BODY PARSERS
// ========================================

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

// ========================================
// COOKIES
// ========================================

app.use(cookieParser());

// ========================================
// LOGGER
// ========================================

app.use(morgan("dev"));

// ========================================
// HEALTH CHECK
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Victoria Taxi Booking API is running.",
  });
});

// ========================================
// API ROUTES
// ========================================

app.use("/api/v1", apiRoutes);

// ========================================
// 404
// ========================================

app.use(notFoundHandler);

// ========================================
// ERROR HANDLER
// ========================================

app.use(errorHandler);

export default app;