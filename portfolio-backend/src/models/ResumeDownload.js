const mongoose = require("mongoose");

const resumeDownloadSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeDownload", resumeDownloadSchema);
