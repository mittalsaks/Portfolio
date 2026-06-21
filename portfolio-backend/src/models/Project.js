const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String, enum: ["Web", "Mobile", "API/Backend"], required: true },
    tech:        [{ type: String }],
    github:      { type: String, default: "" },
    demo:        { type: String, default: "" },
    image:       { type: String, required: true },
    featured:    { type: Boolean, default: false },
    notesUrl:    { type: String, default: "" },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);