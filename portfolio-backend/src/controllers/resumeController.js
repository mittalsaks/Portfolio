const path = require("path");
const fs = require("fs");
const ResumeDownload = require("../models/ResumeDownload");

// @route   GET /api/resume/download
// @access  Public
// Tracks the download, then streams the resume PDF file to the client.
const downloadResume = async (req, res, next) => {
  try {
    // Log the download (fire and forget, doesn't block the response)
    ResumeDownload.create({
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "",
    }).catch((err) => console.error("Resume download logging failed:", err.message));

    // TODO: [REPLACE WITH YOUR ACTUAL RESUME FILE]
    // Place your resume PDF at: src/assets/resume.pdf
    const resumePath = path.join(__dirname, "..", "assets", "resume.pdf");

    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found on server. TODO: place resume.pdf in src/assets/",
      });
    }

    res.download(resumePath, "Resume.pdf");
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/resume/stats
// @access  Private (admin only)
const getDownloadStats = async (req, res, next) => {
  try {
    const total = await ResumeDownload.countDocuments();
    const recent = await ResumeDownload.find().sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, total, recent });
  } catch (error) {
    next(error);
  }
};

module.exports = { downloadResume, getDownloadStats };
