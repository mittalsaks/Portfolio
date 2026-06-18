const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    award:   { type: String, required: true },
    project: { type: String, required: true },
    tech:    [{ type: String }],
    team:    { type: Number, required: true },
    date:    { type: String, required: true },
    order:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hackathon", hackathonSchema);