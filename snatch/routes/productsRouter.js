const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const upload = require("../config/multer-config");
const mongoose = require('mongoose');

router.post("/create", upload.single("image"), function (req, res) {
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  let product = productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });

  req.flash("success" , "Product created successfully");
  res.redirect("/owner/admin")

});

module.exports = router;
