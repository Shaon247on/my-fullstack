import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(env.databaseUrl, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};