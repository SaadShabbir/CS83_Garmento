const express = require("express");
const fs = require("fs"); //for files
// const nodemailer = require('nodemailer');   //for sending messages --- work in progress
const router = express.Router();

// const Tailor = require("../models/Tailor");
// Load User model
const Tailor = require("../models/models/Tailor");

// path will be /api/admin/tailors
router.route("/tailors").get((req, res) => {
  Tailor.find()
    .sort({ _id: -1 })
    .then((tailors) => {
      if (!tailors) {
        return res
          .status(404)
          .json({ message: "There is no tailor available" });
      } else {
        return res.status(200).json(tailors);
      }
    });
});

// path will be /api/admin/tailors
router.route("/tailors").post((req, res) => {
  console.log("tailor", req.body);
  const newMessage = new Tailor({
    ...req.body,
  });
  newMessage
    .save()
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => console.log(err));
});

// path will be /api/admin/tailors/{id}     example: /api/admin/tailors/2
router.route("/tailors/:id").get((req, res) => {
  const id = req.params.id;
  Tailor.findOne({ _id: id }).then((message) => {
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    } else {
      return res.json(message);
    }
  });
});

// path will be /api/admin/tailors/{id}     example: /api/admin/tailors/2
router.route("/tailors/:id").delete((req, res) => {
  Product.findOneAndRemove({ _id: req.params.id }).then((message) => {
    if (!message) {
      return res.status(404).json({ message: " message not found " });
    }
    return res.status(200).json({ success: true, message });
  });
});

module.exports = router;
