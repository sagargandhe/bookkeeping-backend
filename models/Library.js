const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", librarySchema);
