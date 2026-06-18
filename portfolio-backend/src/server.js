// LOCAL DEVELOPMENT ENTRY POINT ONLY.
// This file is NOT used on Vercel — Vercel uses api/index.js instead.
// Run this locally with `npm run dev`.

require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
🚀 Portfolio API server running (LOCAL DEV)
   Mode: ${process.env.NODE_ENV || "development"}
   Port: ${PORT}
   URL:  http://localhost:${PORT}/api/health
    `);
  });
};

startServer();

// Handle unhandled promise rejections gracefully
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
});