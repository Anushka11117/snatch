const userModel=require("../models/user-model")
  const bcrypt= require("bcrypt");
  const jwt=require("jsonwebtoken");
const { generateTokens } = require('../utils/generate token');



module.exports.registerUser=async function(req,res){

try {
    console.log(req.body);
let{fullname, email, password}=req.body;

let salt= await bcrypt.genSalt(10);
let hashed_Password= await bcrypt.hash(password, salt);


    let user = await userModel.create({
        email,
        password:hashed_Password,
        fullname

    })

    let token=generateTokens(user);
    res.cookie("token",token);
    res.send("its working");
    


} catch (error) {
    console.log(error.message)
}


}