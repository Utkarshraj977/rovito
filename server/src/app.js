import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env.js";

import apiRoutes from "./routes/index.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";


const app = express();


// Security
app.use(helmet());


// CORS
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);


// Compression
app.use(compression());


// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// Cookies
app.use(cookieParser());


// Logger
app.use(morgan("dev"));


// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Victoria Taxi Booking API is running.",
  });
});


// API Routes
app.use("/api/v1", apiRoutes);


// 404 Handler
app.use(notFoundHandler);


// Global Error Handler
app.use(errorHandler);


export default app;