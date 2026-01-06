import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

if (!env.MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    cached.promise = mongoose.connect(env.MONGODB_URI, opts)
      .then((mongoose) => {
        logger.info('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        logger.error('MongoDB connection failed', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
