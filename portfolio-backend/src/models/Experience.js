const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company:  { type: String, required: true, trim: true },
    role:     { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    type:     { type: String, enum: ["Full-time", "Internship", "Freelance", "Contract"], required: true },
    bullets:  [{ type: String }],
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);