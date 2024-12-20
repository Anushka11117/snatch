const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  let message = req.flash("message");
  res.render("index", { message, error, isLoggedIn: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products });
});

router.get("/cart", isLoggedIn, (req, res) => {
  res.render("cart");
});

module.exports = router;
