const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const mongoose = require("mongoose");

router.get("/", function (req, res) {
  let error = req.flash("error");
  let message = req.flash("message");
  res.render("index", { message, error, isLoggedIn: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  try {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });

  } catch (error) {
   console.log(error.message);
  }
});

router.get('/cart' , isLoggedIn, async (req,res)=>{
 let user= await userModel.findOne({email:req.user.email}).populate("cart");
const bill=(Number( user.cart[0].price+20)-Number(user.cart[0].discount))
  res.render('cart',{user,bill});
});




router.get("/cart/:productid", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");




  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;
