const express = require("express");
const fs = require("fs"); // for files
const router = express.Router();

// Load User model
const Offer = require("../models/models/Offer");
//const Offers = require('../models/Offers');
const validateOffers = require("../models/Validator").validateOffers;

// path will be /api/products
router.route("/").get((req, res) => {
  Offer.find()
    .sort({ _id: -1 })
    .then((offers) => {
      if (!offers) {
        return res
          .status(404)
          .json({ message: "There are no Products on Offer" });
      }
      return res.status(200).json(offers);
    });
});

// path will be /api/products
router.route("/").post((req, res) => {
  const product = validateOffers(req.body);
  console.log("Data recived to be post", req.body);
  if (product.error) {
    return res.status(400).json({ message: product.error });
  }
  Offer.findOne({ title: req.body.title }).then((product) => {
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    } else {
      const newProduct = new Offer({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        images: req.body.images,
        stock: req.body.stock,
        category: req.body.category,
        timesBought: "0",
        productDescription: req.body.desc,
        enabled: req.body.enabled,
        reviews: [],
        avrStars: "",
      });
      newProduct
        .save()
        .then((product) => {
          res.status(200).json(product);
        })
        .catch((err) => console.log(err));
    }
  });
});

// in case we want to return multiple but specific products.
// for example - handy with cart, this way we avoid sending too many requests
// path will be /api/products/multiple
router.route("/multiple").post((req, res) => {
  const productsDB = [];
  Offer.find()
    .sort({ _id: -1 })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "There are no products" });
      } else {
        products.forEach((item) => {
          productsDB.push(item);
        });
      }
    });
  const idArray = req.body.idArray;

  const filteredDB = [];
  for (let id of idArray) {
    const product = productsDB.find((product) => product.id == id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `product with id ${id} not found` });
    }
    filteredDB.push(product);
  }

  return res.json(filteredDB);
});

// path will be /api/products/{id} example: /api/products/10
router.route("/:id").get((req, res) => {
  const id = req.params.id;
  Offer.findOne({ _id: id })
    .then(async (product) => {
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      return res.status(200).json(product);
    })
    .catch((err) =>
      res.status(404).json({ message: "There is no Product for this User" })
    );
});

// path will be /api/products/{id} example: /api/products/10
router.route("/:id").put((req, res) => {
  const id = req.params.id;
  const newProduct = validateOffers(req.body);
  if (newProduct.error) {
    return res.status(400).json({ message: newProduct.error });
  }
  Offer.findOne({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    } else {
      // Update
      Offer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newProduct },
        { new: true }
      ).then((product) => res.status(200).json(product));
    }
  });
});

// path will be /api/products/{id}  example: /api/products/10
router.route("/:id").delete((req, res) => {
  Product.findOneAndRemove({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  });
});

// updates reviews and average stars
// path will be /api/products/{id}/reviews   example: /api/products/10/reviews
router.route("/:id/reviews").post((req, res) => {
  let productsDB = JSON.parse(fs.readFileSync("db/products.json"));
  const id = req.params.id;
  const review = req.body.review;
  const avrStars = req.body.avrStars;
  Offer.findOne({ _id: id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    } else {
      product.review = req.body.review;
      product.avrStars = req.body.avrStars;
      // Update
      Offer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: product },
        { new: true }
      ).then((product) => res.status(200).json(product));
    }
  });
});

// updates timesBought and stock
// path will be /api/products/{id}/sold   example: /api/products/10/sold
router.route("/:id/sold").post((req, res) => {
  Offer.findOne({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    } else {
      product.timesBought = req.body.timesBought;
      product.stock = req.body.stock;
      // Update
      Offer.findOneAndUpdate(
        { _id: req.params.id },
        { $set: product },
        { new: true }
      ).then((product) => res.status(200).json(product));
    }
  });
});

// path will be /api/products/filter?query  example: /api/products/filter?title=pickle
router.route("/filter").get((req, res) => {
  const productsDB = [];
  Offer.find()
    .sort({ _id: -1 })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "There are no products" });
      } else {
        products.forEach((item) => {
          productsDB.push(item);
        });
      }
    });

  let filteredDB = productsDB;
  const title = req.query.title;
  const priceLow = req.query.priceLow;
  const priceHigh = req.query.priceHigh;
  const stars = req.query.stars;
  const timesBought = req.query.timesBought;

  if (title) {
    filteredDB = filteredDB.filter((product) => product.title.includes(title));
    if (filteredDB.length == 0) {
      return res.status(404).json({ message: "product not found" });
    }
  }

  if (priceLow && priceHigh) {
    filteredDB = filteredDB.filter(
      (product) => product.price >= priceLow && product.price <= priceHigh
    );
    if (filteredDB.length == 0) {
      return res.status(404).json({ message: "product not found" });
    }
  }

  if (stars) {
    filteredDB = filteredDB.filter((product) => product.avrStars >= stars);
    if (filteredDB.length == 0) {
      return res.status(404).json({ message: "product not found" });
    }
  }

  if (timesBought) {
    filteredDB = filteredDB.filter(
      (product) => product.timesBought >= timesBought
    );
    if (filteredDB.length == 0) {
      return res.status(404).json({ message: "product not found" });
    }
  }

  return res.json(filteredDB);
});

module.exports = router;
