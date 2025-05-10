import { PrismaClient } from "@prisma/client";

const dbUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: { url: dbUrl },
  },
});

export default prisma;
