import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: process.env.DATABASE_URL,

  CLIENT_URL: process.env.CLIENT_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  JWT_ACCESS_EXPIRY:
  process.env.JWT_ACCESS_EXPIRY || "15m",

JWT_REFRESH_EXPIRY:
  process.env.JWT_REFRESH_EXPIRY || "7d",
};

export default env;