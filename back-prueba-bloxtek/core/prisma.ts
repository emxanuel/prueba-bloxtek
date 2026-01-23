import { PrismaClient } from "@/database/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "./config";

if (!config.databaseUrl) {
  console.error("❌ DATABASE_URL environment variable is not set");
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString: config.databaseUrl });

const prisma = new PrismaClient({ 
  adapter,
  log: ['error', 'warn'],
});

// Test connection on startup (non-blocking)
prisma.$connect()
  .then(() => {
    console.log("✅ Prisma connected to database successfully");
  })
  .catch((error) => {
    console.error("❌ Failed to connect to database:", error.message);
    console.error("Database connection will be retried on first query");
  });

export default prisma;