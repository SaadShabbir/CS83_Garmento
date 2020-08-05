const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NavSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

module.exports = Nav = mongoose.model("nav", NavSchema);
