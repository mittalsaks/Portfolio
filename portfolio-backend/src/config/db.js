const mongoose = require("mongoose");

/**
 * Serverless-safe MongoDB connection.
 *
 * WHY THIS IS DIFFERENT FROM A NORMAL EXPRESS APP:
 * On a traditional server, connectDB() runs ONCE when the server boots,
 * and the connection stays open forever.
 *
 * On Vercel, there is no long-running server. Each request may hit a
 * fresh "serverless function" instance. If we call mongoose.connect()
 * on every single request, we can rapidly open hundreds of connections
 * and hit MongoDB Atlas's free-tier limit (500 connections), causing
 * random failures under any real traffic.
 *
 * THE FIX: cache the connection promise on the `global` object.
 * - Vercel sometimes reuses a "warm" function instance for the next
 *   request. If it's warm, `global._mongoConn` already exists, so we
 *   reuse it instantly — no new connection is opened.
 * - If it's a fresh ("cold") instance, global._mongoConn won't exist
 *   yet, so we create the connection once and cache it for next time.
 */

let cached = global._mongoConn;

if (!cached) {
  cached = global._mongoConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // Already connected on this warm instance — reuse it.
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MONGODB_URI is not set. Add it in your .env (local) or Vercel Project Settings -> Environment Variables (production)."
      );
    }

    cached.promise = mongoose
      .connect(uri, {
        // Keep the connection pool small — serverless functions don't
        // need (and shouldn't hold) a large pool per instance.
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
        mongoose.connection.on("disconnected", () => {
          console.log("⚠️ MongoDB disconnected, clearing cache");
          cached.conn = null;
          cached.promise = null;
        });
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise so the next request can retry instead of
    // being stuck on a permanently failed promise.
    cached.promise = null;
    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;