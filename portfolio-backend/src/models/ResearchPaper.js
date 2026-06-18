const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true, trim: true },
    authors:    { type: String, required: true },
    venue:      { type: String, required: true },
    year:       { type: Number, required: true },
    abstract:   { type: String, required: true },
    tags:       [{ type: String }],
    pdfUrl:     { type: String, default: "" },
    scholarUrl: { type: String, default: "" },
    arxivUrl:   { type: String, default: "" },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Research", researchSchema);