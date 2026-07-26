import app from "./app.js";
import  prisma  from "./config/prisma.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

const startServer = async () => {
  try {
    await prisma.$connect();

    logger.info("✅ Connected to PostgreSQL");

    app.listen(env.PORT, () => {
      logger.info(
        `🚀 Server running on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    logger.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  logger.info("🛑 Server shutting down...");

  await prisma.$disconnect();

  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("🛑 Server terminated...");

  await prisma.$disconnect();

  process.exit(0);
});