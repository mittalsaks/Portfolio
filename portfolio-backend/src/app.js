const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const morgan  = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { generalLimiter, contactLimiter } = require("./middleware/rateLimiter");

const authRoutes    = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const hackathonRoutes  = require("./routes/hackathonRoutes");
const researchRoutes   = require("./routes/researchRoutes");
const skillRoutes      = require("./routes/skillRoutes");

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Security headers
app.use(helmet());

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
  "https://portfolio-mittalsaks.vercel.app",
  "https://mittalsaks.vercel.app",
  "https://portfolio-g8b567.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting
app.use("/api/", generalLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth",       authRoutes);
app.use("/api/profile",    profileRoutes);
app.use("/api/projects",   projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/research",   researchRoutes);
app.use("/api/skills",     skillRoutes);
app.use("/api/contact",    contactLimiter, contactRoutes); // extra rate limit on contact

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;