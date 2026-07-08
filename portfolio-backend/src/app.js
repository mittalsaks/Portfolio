require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const morgan  = require("morgan");
const cookieParser = require("cookie-parser");
const NodeCache = require("node-cache");

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

// Models (for /api/all combined endpoint)
const Profile       = require("./models/Profile");
const Project       = require("./models/Project");
const Skill         = require("./models/Skill");
const Experience    = require("./models/Experience");
const Hackathon     = require("./models/Hackathon");
const ResearchPaper = require("./models/ResearchPaper");

// Connect to MongoDB Atlas
// connectDB();

const app = express();
app.set('trust proxy', 1);

// ─── CACHE SETUP ──────────────────────────────────────────────────────────────
// stdTTL: 300s = 5 min | checkperiod: auto-delete expired keys every 60s
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

// Cache middleware — only caches GET requests on /api/* (except auth & contact)
const cacheMiddleware = (req, res, next) => {
  const skip =
    req.method !== "GET" ||
    req.path.startsWith("/api/auth") ||
    req.path.startsWith("/api/contact");

  if (skip) return next();

  const key = req.originalUrl;
  const hit = cache.get(key);
  if (hit) {
    res.setHeader("X-Cache", "HIT");
    return res.json(hit);
  }

  // Intercept res.json to store response in cache
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    cache.set(key, data);
    res.setHeader("X-Cache", "MISS");
    return originalJson(data);
  };

  next();
};

// Helper to invalidate cache when admin mutates data (POST/PUT/DELETE)
const invalidateCache = (req, res, next) => {
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
    cache.flushAll(); // simple: clear all on any write
  }
  next();
};
// ──────────────────────────────────────────────────────────────────────────────

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
  "https://portfolio-sakshi.onrender.com",
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

// Apply cache + invalidation globally on /api/
app.use("/api/", cacheMiddleware);
app.use("/api/", invalidateCache);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ─── /api/all — combined endpoint (1 request = all public data) ───────────────
// Frontend calls this once on page load instead of 6 separate requests
app.get("/api/all", async (req, res, next) => {
  try {
    const [profile, projects, skills, experience, hackathons, research] =
      await Promise.all([
        Profile.findOne().lean(),
        Project.find().sort("order").lean(),
        Skill.find().sort("order").lean(),
        Experience.find().sort("order").lean(),
        Hackathon.find().sort("order").lean(),
        ResearchPaper.find().sort("order").lean(),
      ]);

    res.json({ success: true, data: { profile, projects, skills, experience, hackathons, research } });
  } catch (err) {
    next(err);
  }
});
// ──────────────────────────────────────────────────────────────────────────────

// Routes
app.use("/api/auth",       authRoutes);
app.use("/api/profile",    profileRoutes);
app.use("/api/projects",   projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/research",   researchRoutes);
app.use("/api/skills",     skillRoutes);
app.use("/api/contact",    contactLimiter, contactRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;