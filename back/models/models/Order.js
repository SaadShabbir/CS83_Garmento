const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const Order = mongoose.model(
  'orders',
  new mongoose.Schema({
    product: ObjectId,
    title: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    }, 
    product_image :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    price :{
        type: Number,
        required: false,
    }, 
    payment_status :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    billing_address :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
    },
    billing_address2 :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
    },
    purchased_byzipcode :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
    },
    added_by: ObjectId,
    added_byName: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    purchased_by: ObjectId,
    purchased_byName: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    purchased_byEmail: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    size : {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    color : {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
  })
);
module.exports = Order;