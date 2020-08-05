const express = require("express");
const fs = require("fs"); // for files
const router = express.Router();
// Load User model
const Product = require("../models/models/Product");
const Order = require("../models/models/Order");
//const Product = require('../models/Product');
var multipart = require('connect-multiparty');
const validateProduct = require("../models/Validator").validateProduct;
var prdouctMultiPart = multipart({
  uploadDir: './uploads/products'
});
// path will be /api/products
// @route  GET /api/poducts
// @desc   Get all Products
// @access  Public
router.route("/").get((req, res) => {
  Product.find()
    .sort({ _id: -1 })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "There are no products" });
      }
      return res.status(200).json(products);
    });
});
router.route("/ordersbyUser/:id").get((req, res) => {
  console.log(req.params.id);
  Order.find({ added_by: req.params.id })
    .sort({ _id: -1 })
    .then((order1) => {
      if (!order1) {
        return res.status(404).json({ message: "There are no orderS" });
      }
      return res.status(200).json(order1);
    });
});
router.route("/:type/:id").get((req, res) => {
  let type = req.params.type;
  let id = req.params.id;
  let cond ={};
  if(type == "category"){
    cond = { category: id };
  }else if(type == "subcategory"){
    cond = { subcategory: id };
  }else if(type == "subsubcategory"){
    cond = { subsubcategory: id };
  } 
  Product.find(cond)
    .sort({ _id: -1 })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "There are no products" });
      }
      return res.status(200).json(products);
    });
});

router.route("/byUser/:id").get((req, res) => {
  Product.find({ added_by: req.params.id })
    .sort({ _id: -1 })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "There are no products" });
      }
      return res.status(200).json(products);
    });
});



// path will be /api/products
// @route  POST /api/products
// @desc   Add new Product in DB
// @access  Public
router.route("/").post(prdouctMultiPart, (req, res) => {
  var filepath = '';
  var filesArr = [];
  if(req.files.file != undefined){
    req.files.file.forEach((element, index) => {
      let path = element.path.substr(element.path.indexOf("\\") + 1);
      if(index == 0){
        filepath = path; 
        filesArr.push(path);
      }else{
        filesArr.push(path);
      }
    });
    // var path = req.files.file.path;
    // filepath = path.substr(path.indexOf("\\") + 1); //for local set indexOf parameter to \\ for live set indexOf parameter to /
  }
  delete req.body.imagePath;
  req.body.imageUrl = filepath;

  const product = validateProduct(req.body);
  console.log(req.body);
  if (product.error) {
    return res.status(400).json({ message: product.error });
  }
  Product.findOne({ title: req.body.title }).then((product) => {
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    } else {
      const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        stock: req.body.stock,
        imageUrl: req.body.imageUrl,
        otherImages : filesArr,
        sizeList : req.body.sizeList.split(','),
        colorList : req.body.colorList.split(','),
        category: req.body.category,
        subcategory: req.body.subcategory,
        subsubcategory: req.body.subsubcategory,
        category_name: req.body.category_name,
        subcategory_name: req.body.subcategory_name,
        subsubcategory_name: req.body.subsubcategory_name,
        timesBought: "0",
        productDescription: req.body.desc,
        enabled: req.body.enabled,
        reviews: [],
        avrStars: "",
        added_by : req.body.added_by,
        added_name : req.body.added_name
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
// path will be /api/multiple
// @route  POST /api/multiple
// @desc   Add multiple Product in DB
// @access  Public
router.route("/multiple").post(prdouctMultiPart, (req, res) => {
  const productsDB = [];
  Product.find()
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
// @route   GET /api/products/{id}
// @desc    Get product by ID
// @access  Public
router.route("/:id").get((req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: id })
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
router.route("/:id").put(prdouctMultiPart, (req, res) => {
  var filepath = '';
  var filesArr = [];
  if(req.files.file != undefined){
    req.files.file.forEach((element, index) => {
      let path = element.path.substr(element.path.indexOf("\\") + 1);
      if(index == 0){
        filepath = path; 
        filesArr.push(path);
      }else{
        filesArr.push(path);
      }
    });
    // var path = req.files.file.path;
    // filepath = path.substr(path.indexOf("\\") + 1); //for local set indexOf parameter to \\ for live set indexOf parameter to /
    
  }else{
    filepath = req.body.imagePath;
    filesArr = req.body.otherImagesPath;
    delete req.body.file;
  }
  delete req.body.imagePath;
  delete req.body.otherImagesPath;
  req.body.imageUrl = filepath;
  console.log('arr',filesArr);
  req.body.otherImages = filesArr == null ? [] :filesArr;
  req.body.sizeList = req.body.sizeList.split(',');
  req.body.colorList = req.body.colorList.split(',');
  req.body.category = req.body.category.split('__')[0];
  req.body.subcategory = req.body.subcategory.split('__')[0];
  req.body.subsubcategory = req.body.subsubcategory.split('__')[0];
  console.log(req.body);
  const newProduct = validateProduct(req.body);
  if (newProduct.error) {
    return res.status(400).json({ message: newProduct.error });
  }
  Product.findOne({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    } else {
      // Update
      console.log('newproduct', newProduct);
      Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newProduct },
        { new: true }
      ).then((product) => res.status(200).json(product));
    }
  });
});

// path will be /api/products/{id}  example: /api/products/10
router.route("/:id").delete((req, res) => {
  console.log("for delete", req.params.id);
  Product.findOneAndRemove({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  });
});

// path will be /api/products/{id}  example: /api/products/10
router.route("/delcartitem/:id").delete((req, res) => {
  console.log("for delete", req.params.id);
  Order.findOneAndRemove({ _id: req.params.id }).then((product) => {
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
router.route("/:id/reviews").post(prdouctMultiPart, (req, res) => {
  let productsDB = JSON.parse(fs.readFileSync("db/products.json"));
  const id = req.params.id;
  const review = req.body.review;
  const avrStars = req.body.avrStars;
  Product.findOne({ _id: id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    } else {
      product.review = req.body.review;
      product.avrStars = req.body.avrStars;
      // Update
      Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: product },
        { new: true }
      ).then((product) => res.status(200).json(product));
    }
  });
});

// updates timesBought and stock
// path will be /api/products/{id}/sold   example: /api/products/10/sold
router.route("/:id/sold").post(prdouctMultiPart, (req, res) => {
  Product.findOne({ _id: req.params.id }).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    } else {
      product.timesBought = req.body.timesBought;
      product.stock = req.body.stock;
      // Update
      Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: product },
        { new: true }
      ).then((product) => res.status(200).json(product));
    }
  });
});


router.route("/addtocart").post(prdouctMultiPart, (req, res) => {
  
  let obj = {
    product : req.body._id,
    payment_status : req.body.payment_status,
    title : req.body.title,
    price : req.body.price,
    product_image : req.body.imageUrl,
    billing_address : "",
    billing_address2 : "",
    added_by : req.body.added_by,
    added_byName : req.body.added_name,
    purchased_by : req.body.purchased_by,
    purchased_byName : req.body.purchased_byName,
    purchased_byEmail : "",
    purchased_byzipcode : "",
    size : req.body.sizeSelected,
    color : req.body.colorSelected
  };
  let order = new Order(obj);
  order.save().then((order1) => {
    res.status(200).json(order1);
  })
  .catch((err) => console.log(err));
});


router.route("/checkout").post(prdouctMultiPart, (req, res) => {
  //let order = new Order(obj);
  Order.bulkWrite(
    req.body.cart_data.map((order) => 
      ({
        updateOne: {
          filter: { _id: order._id },
          update: { $set: { purchased_byName: req.body.name, purchased_byEmail: req.body.email, billing_address: req.body.address1, purchased_byzipcode: req.body.zipcode, payment_status: req.body.payment_status } },
          upsert : true
        }
      })
    )
  ).then((order1) => {
    res.status(200).json(order1);
  })
  .catch((err) => console.log(err));
});

// path will be /api/products/filter?query  example: /api/products/filter?title=pickle
router.route("/filter").get((req, res) => {
  const productsDB = [];
  Product.find()
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
