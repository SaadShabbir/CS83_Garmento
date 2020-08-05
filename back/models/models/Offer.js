const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OfferSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  timesBought: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },

  productDescription: {
    type: String,
    required: true,
  },
  reviews: [
    {
      stars: String,
      text: String,
      author: String,
    },
  ],
  enabled: {
    type: Boolean,
  },
  avrStars: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Offer = mongoose.model("offers", OfferSchema);
