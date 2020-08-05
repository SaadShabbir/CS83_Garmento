const express = require("express");
const fs = require("fs"); //for files
// const nodemailer = require('nodemailer');   //for sending messages --- work in progress
const router = express.Router();
const Message = require("../models/models/Message");
//const Message2 = require('../models/Message2');

// path will be /api/admin/messages
router.route("/messages2").get((req, res) => {
  Message.find()
    .sort({ _id: -1 })
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: "There are no messages" });
      }
      return res.status(200).json(message);
    });
});

// path will be /api/admin/messages
router.route("/messages2").post((req, res) => {
  const newMessage = new Message({
    ...req.body,
  });
  newMessage
    .save()
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => console.log(err));
});

// path will be /api/admin/messages/{id}     example: /api/admin/messages/2
router.route("/messages2/:id").get((req, res) => {
  const messagesDB2 = JSON.parse(fs.readFileSync("db/messages2.json"));
  const id = req.params.id;
  Message.findOne({ _id: id })
    .then(async (message) => {
      if (!message) {
        return res.status(404).json({ message: "message not found" });
      }
      return res.status(200).json(message);
    })
    .catch((err) =>
      res.status(404).json({ message: "There is no Message for this User" })
    );
});

// path will be /api/admin/messages/{id}     example: /api/admin/messages/2
router.route("/messages2/:id").delete((req, res) => {
  const id = req.params.id;
  Message.findOneAndRemove({ _id: id }).then((user) => {
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    }
    return res.status(200).json({ success: true, message });
  });
});

module.exports = router;
