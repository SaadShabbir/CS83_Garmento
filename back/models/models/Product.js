const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
ObjectId = mongoose.Schema.ObjectId;
const ProductSchema = new Schema({
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
  stock: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: 'String',
    required: true,
    min: 0,
    max: 255
  },
  otherImages: {
    type: Array
  },
  sizeList: {
    type: Array
  },
  colorList: {
    type: Array
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: false,
  },
  subsubcategory: {
    type: String,
    required: false,
  },
  category_name: {
    type: String,
    required: false,
  },
  subcategory_name: {
    type: String,
    required: false,
  },
  subsubcategory_name: {
    type: String,
    required: false,
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
  added_by: ObjectId,
  added_name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = mongoose.model("products", ProductSchema);
