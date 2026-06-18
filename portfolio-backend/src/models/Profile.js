const mongoose = require("mongoose");

// Mirrors data.ts `profile` object exactly. This is a singleton — only one
// document should ever exist, fetched/updated by a fixed known id ("singleton").
const profileSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "singleton" },
    name: { type: String, required: true, default: "[REPLACE WITH YOUR NAME]" },
    handle: { type: String, default: "" },
    roles: [{ type: String }], // typing-effect cycle, e.g. ["Full Stack Developer", "Problem Solver"]
    tagline: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },
    availability: { type: String, default: "" },
    resumeUrl: { type: String, default: "/resume.pdf" },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      email: { type: String, default: "" },
    },
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model("Profile", profileSchema);
