const express=require ('express');
const router =express.Router();
const {registerUser,loginUser}=require("../Controllers/authController")

router.get("/",function(req,res){
    res.send("its working");
})
router.post("/register",registerUser );
router.post('/login' , loginUser)

module.exports=router;