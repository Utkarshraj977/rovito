import app from "./app.js";
import env from "./config/env.js";
import prisma from "./config/prisma.js";

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect(); 

    console.log("✅ Connected to PostgreSQL (Neon)");

    app.listen(env.PORT, () => {
      console.log(
        `🚀 Server running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);

    process.exit(1);
  }
}

startServer();