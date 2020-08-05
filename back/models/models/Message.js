const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateSent: {
    type: String,
    required: true,
  },
  responded: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model("messages", MessageSchema);
