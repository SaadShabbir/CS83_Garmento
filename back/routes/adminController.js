const express = require("express");
const fs = require("fs"); //for files
// const nodemailer = require('nodemailer');   //for sending messages --- work in progress
const router = express.Router();

// Load User model
const Message = require("../models/models/Message");
const Nav = require("../models/models/Nav");
const e = require("express");
//const Message = require('../models/Message');

// path will be /api/admin/messages
router.route("/messages").get((req, res) => {
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
router.route("/messages").post((req, res) => {
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
router.route("/messages/:id").get((req, res) => {
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
router.route("/messages/:id").delete((req, res) => {
  const id = req.params.id;
  Message.findOneAndRemove({ _id: id }).then((user) => {
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    }
    return res.status(200).json({ success: true, message });
  });
});

// path will be /api/admin/messages/{id}     example: /api/admin/messages/2
router.route("/create_nav").get((req, res) => {
  let navobj = [
    {id : '1', pid : '0', name : 'Unstitched'},
    {id : '2', pid : '1', name : 'Summer Volume'},
    {id : '3', pid : '1', name : 'Winter Volume'},
    {id : '4', pid : '0', name : 'Women'},
    {id : '5', pid : '4', name : 'Eastern'},
    {id : '6', pid : '5', name : 'Casual'},
    {id : '7', pid : '5', name : 'Formal'},
    {id : '8', pid : '5', name : 'Bottoms'},
    {id : '9', pid : '4', name : 'Western'},
    {id : '10', pid : '9', name : 'Tops'},
    {id : '11', pid : '9', name : 'Bottoms'},
    {id : '12', pid : '4', name : 'Accessories & Outwear'},
    {id : '13', pid : '12', name : 'Footwear'},
    {id : '14', pid : '12', name : 'Bags & clutches'},
    {id : '15', pid : '12', name : 'Women Dupatta'},
    {id : '16', pid : '12', name : 'Sweaters'},
    {id : '17', pid : '0', name : 'Man'},
    {id : '18', pid : '17', name : 'Shirts'},
    {id : '19', pid : '18', name : 'Casual Shirts'},
    {id : '20', pid : '18', name : 'Polo Shirts'},
    {id : '21', pid : '18', name : 'T-Shirts'},
    {id : '22', pid : '17', name : 'Bottoms'},
    {id : '23', pid : '22', name : 'Denim'},
    {id : '24', pid : '22', name : 'Chinos'},
    {id : '25', pid : '22', name : 'Sweat pants'},
    {id : '26', pid : '22', name : 'Shorts'},
    {id : '27', pid : '17', name : 'Outwear'},
    {id : '28', pid : '28', name : 'Sweaters & Sweatshirts'},
    {id : '29', pid : '28', name : 'Hoodies & Jackets'},
    {id : '30', pid : '17', name : 'Men’s Accessories'},
    {id : '31', pid : '30', name : 'Footwear'},
    {id : '32', pid : '30', name : 'Man Bags'},
    {id : '33', pid : '30', name : 'Belts'},
    {id : '34', pid : '0', name : 'Flat Sale'},
    {id : '35', pid : '34', name : 'Flat 30%'},
    {id : '36', pid : '34', name : 'Flat 50%'},
    {id : '37', pid : '34', name : 'Flat 60%'},
    {id : '38', pid : '34', name : 'Flat 70%'},    
  ];
  navobj.forEach((elem, index) => {
    console.log(index);
    const newNav = new Nav(elem);
    newNav.save();
  })
  res.json({status : 'done'});
});

router.route("/get_nav").get((req, res) => {
  let gennev = [];
  Nav.find()
    .sort({ id: 1 })
    .then((navs) => {
      if(!navs) {
        return res.status(404).json({ message: "There are no navs" });
      }
        navs.forEach((element, index) => {
          if(element.pid == 0){
            let items = navs.filter(function(item) {
              return item.pid == element.id;
            });
            let itms = [];
            items.forEach((selement, sindex) => {
              let sitems = navs.filter(function(sitem) {
                return sitem.pid == selement.id;
              });
              let sobj = {
                _id : selement._id,
                id : selement.id,
                pid : selement.pid,
                name : selement.name,
                subitems : sitems
              };
              itms.push(sobj);
            });
            let obj = {
              _id : element._id,
              id : element.id,
              pid : element.pid,
              name : element.name,
              items : itms
            };
            gennev.push(obj);
          }
          
      });
      //console.log(gennev);
      return res.status(200).send(gennev);
    });
})

router.route("/get_cats").get((req, res) => {
  let gennev = [];
  Nav.find()
    .sort({ id: 1 })
    .then((navs) => {
      if(!navs) {
        return res.status(404).json({ message: "There are no navs" });
      }
      return res.status(200).send(navs);
    });
})

router.route("/sellers").get((req, res) => {
  User.find({userType: 'seller'})
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

router.route("/sellers/:id/:status").put(async (req, res) => {
  console.log(req.params);
  if(req.params.status == 'approved'){
    var status = 'un-approved';
  }else{
    var status = 'approved';
  }
  const resp = await User.findByIdAndUpdate(
    req.params.id,
    { 
      approved_status : status,
    },
    {new: true}
  );
  console.log(resp);
  res.send(resp);
});

module.exports = router;
