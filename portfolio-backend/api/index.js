// VERCEL SERVERLESS ENTRY POINT
//
// Vercel auto-detects any file inside /api as a serverless function.
// This file is the ONLY thing that changes structurally from your
// original server.js — your app.js, routes/, models/, middleware/
// are untouched and reused exactly as you wrote them.
//
// What's different from server.js:
//   - No app.listen(PORT) — Vercel handles starting/stopping the
//     function itself; calling .listen() here would do nothing useful
//     and can even cause errors in the Vercel runtime.
//   - connectDB() is awaited INSIDE the request handler (not once at
//     startup), using the cached/serverless-safe version in config/db.js.
//     This guarantees the DB is connected before any route runs, on
//     both cold and warm starts, without ever opening duplicate
//     connections on warm starts.

const app = require("../src/app");
const connectDB = require("../src/config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Database connection failed. Please try again shortly.",
    });
  }

  return app(req, res);
};