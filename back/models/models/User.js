const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
  },
  broughtProducts: [
    {
      id: String,
      quantity: String,
      title: String,
    },
  ],
  isAdmin: {
    type: Boolean,
  },
  approved_status: {
    type: String,
  },
  cart: [
    {
      id: String,
      quantity: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
