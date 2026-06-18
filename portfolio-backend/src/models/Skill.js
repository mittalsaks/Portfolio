const mongoose = require("mongoose");

// Mirrors data.ts `SkillGroup` shape: { category, items: [{ name, level }] }
// Each document here IS one category group (not one individual skill),
// so GET /api/skills returns an array that matches `skills: SkillGroup[]` directly.
const skillItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100, required: true }, // used for neon fill animation width
  },
  { _id: false }
);

const skillGroupSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Databases", "DevOps & Tools", "Languages"],
      required: true,
      unique: true,
    },
    items: [skillItemSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillGroupSchema);
