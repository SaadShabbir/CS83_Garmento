const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const router = express.Router();
// Load User model
const User = require("../models/models/User");
const Order = require("../models/models/Order");
//const User = require('../models/User');
const validateUser = require("../models/Validator").validateUser;
const validateAdminUser = require("../models/Validator").validateAdminUser;
const validateLogin = require("../models/Validator").validateLogin;
const validatePayment = require("../models/Validator").validatePayment;
var multipart = require('connect-multiparty');
const validateProduct = require("../models/Validator").validateProduct;
var userMultiPart = multipart({
  uploadDir: './uploads'
});
const secret = "secret_password";

// for passwords
const encrypt = (data) => {
  console.log(data);
  const hash = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return hash;
};

// path will be /api/users
// @route  GET /api/users
// @desc   Get all Users
// @access  Public
router.route("/").get((req, res) => {
  // console.log(req.params.type);return false;
  User.find({userType: 'buyer'})
    .sort({ _id: -1 })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "There is no user found" });
      } else {
        const addObj = JSON.parse(JSON.stringify(users));
        const allUsers = [];
        addObj.forEach((user, idx) => {
          if (user.password != undefined) {
            delete user.password;
            allUsers.push(user);
          }
        });
        return res.status(200).json(allUsers);
      }
    });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.route("/register").post(userMultiPart, (req, res) => {
  console.log(req.body);
  const user = validateUser(req.body);
  if (user.error) {
    return res.status(400).json({ message: user.error });
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.newPassword,
        age: req.body.age,
        birthday: req.body.birthday,
        phone: req.body.phone,
        gender : req.body.gender,
        userType: req.body.userType,
        isAdmin: false,
        approved_status : 'un-approved',
        balance: "0",
        broughtProducts: [],
        cart: [],
      });
      newUser.password = encrypt(req.body.newPassword);
      newUser
        .save()
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => console.log(err));
    }
  });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.route("/login").post(userMultiPart, (req, res) => {
  //console.log(req.body);return false;
  let { username, password } = req.body;
  console.log(password);
  let encrpytpassword = encrypt(password);
  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.username !== username || user.password !== encrpytpassword) {
      return res
        .status(404)
        .json({ message: "incorrect username or password" });
    } else if(user.userType === 'seller' && user.approved_status == 'un-approved'){
      return res
        .status(404)
        .json({ message: "You are Not approved by Admin" });
    }else {
      const userData = JSON.parse(JSON.stringify(user));
      Object.keys(userData).forEach((field) => {
        if (userData[field] !== undefined && userData[field] === "") {
          userData[field] = null;
        }
      });
      if (userData.password !== undefined) {
        delete userData.password;
      }

      return res.json(userData);
    }
  });
});

// path will be /api/users/{id} example: /api/users/10
router.route("/:id").get((req, res) => {
  const id = req.params.id;
  console.log("id", id);
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json(user);
    })
    .catch((err) => res.status(404).json({ message: "There is no User" }));
});

// path will be /api/users/{id} example: /api/users/10
router.route("/:id").put(userMultiPart, (req, res) => {
  const id = req.params.id;
  console.log("id for edit", req.params.id);
  const usersDB = JSON.parse(fs.readFileSync("db/users.json"));

  const user = usersDB.find((user) => user.id == id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (req.body.oldPassword && encrypt(req.body.oldPassword) !== user.password) {
    return res.status(400).json({ message: "wrong password" });
  }

  let newUser;
  if (user.isAdmin) {
    if (req.body.newPassword) {
      req.body.password = encrypt(req.body.newPassword);
    }
    newUser = validateAdminUser(req.body);
  } else {
    const username = req.body.username;
    if (username) {
      if (!(typeof username === "string" || username instanceof String)) {
        return res.status(404).json({
          message:
            "user must have username property and it must be in string format",
        });
      } else {
        User.updateUserName(user, username);
        fs.writeFileSync("db/users.json", JSON.stringify(usersDB, null, 2));
        return res.json(user);
      }
    }
    newUser = validateUser(req.body);
  }
  if (newUser.error) {
    return res.status(400).json({ message: newUser.error });
  }
  User.update(user, { ...newUser });

  fs.writeFileSync("db/users.json", JSON.stringify(usersDB, null, 2));
  return res.json(user);
});

// path will be /api/users/{id} example: /api/users/10
router.route("/:id").delete((req, res) => {
  const id = req.params.id;
  console.log("id", id);
  Product.findOneAndRemove({ _id: id }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  });
});

// path will be /api/users/{id} example: /api/users/10
router.route("/:id/cart").get((req, res) => {
  const id = req.params.id;
  console.log("id", id);
  Order.find({ purchased_by: id, payment_status : "pending" })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(user);
    })
    .catch((err) => res.status(404).json({ message: "There is no Order" }));
});

// path will be /api/users/{id}/payment example: /api/users/10/payment
router.route("/:id/payment").post(userMultiPart, (req, res) => {
  const { balance, products } = validatePayment(req.body);
  const id = req.params.id;

  console.log("id", id);

  User.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      user.review = req.body.review;
      user.avrStars = req.body.avrStars;
      // Update
      User.findOneAndUpdate(
        { _id: id },
        { $set: user },
        { new: true }
      ).then((user) => res.status(200).json(user));
    }
  });
});

module.exports = router;
