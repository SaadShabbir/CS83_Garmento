const express = require("express");
const fs = require("fs");
const router = express.Router();

//const User = require('../models/User');
const User = require("../models/models/User");
const validateCartProduct = require("../models/Validator").validateCartProduct;

// path will be /api/users/{id}/cart
router.route("/:id/cart").get((req, res) => {
  const id = req.params.id;
  console.log("id in cart", id);
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json(user.cart);
    })
    .catch((err) => res.status(404).json({ message: "There is no User" }));
});

// path will be /api/users/{id}/cart
router.route("/:id/cart").post((req, res) => {
  const id = req.params.id;
  const product = validateCartProduct(req.body);
  if (product.error) {
    return res.status(400).json({ message: product.error });
  }
  User.findOne({ _id: id })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        user.product = req.body;
        // Update
        Product.findOneAndUpdate(
          { _id: req.params.id },
          { $set: user },
          { new: true }
        ).then((product) => res.status(200).json(product));

        return res.json(product.productId);
      }
    })
    .catch((err) =>
      res.status(404).json({ message: "There is no user created" })
    );
});

// path will be /api/users/{id}/cart/{id}/all
router.route("/:id/cart/all").delete((req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      user.cart = [];
      // Update
      User.findOneAndUpdate(
        { _id: id },
        { $set: user },
        { new: true }
      ).then((user) => res.status(200).json(user.cart));
    }
  });
});

// path will be /api/users/{id}/cart/{id}
router.route("/:id/cart/:prodId").delete((req, res) => {
  const id = req.params.id;
  const prodId = req.params.prodId;

  const usersDB = JSON.parse(fs.readFileSync("db/users.json"));
  const user = usersDB.find((user) => user.id == id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const product = user.cart.find((product) => product.id == prodId);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  User.removeFromCart(user, product);

  fs.writeFileSync("db/users.json", JSON.stringify(usersDB, null, 2));
  return res.json(product);
});

module.exports = router;
