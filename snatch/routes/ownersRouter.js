const express=require ('express');
const router =express.Router();
const ownerModel =require("../models/owner-model");




router.get("/", async (req, res) => {
    res.send("Everything just fine");
  });
  
  //DEV routes
  if (process.env.NODE_ENV == "development") {
    try {
      router.post("/create", async (req, res) => {
        let { fullname, email, password, contact } = req.body;
        let owners = await ownerModel.find();
        if (owners.length > 0) {
          res.send({
            response: "Their can be only 1 owner",
          });
          return;
        } else {
          let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
            contact,
          });
          res.send(createdOwner);
        }
      });
    } catch (err) {
      res.send(err.message);
    }
  }

router.get("/admin", async (req, res) => {
    let success = req.flash("success") ;
      res.render('createproducts',{success});
    });






module.exports=router;