const userModel=require("../models/user-model")
  const bcrypt= require("bcrypt");

const { generateTokens } = require('../utils/generate token');



module.exports.registerUser=async function(req,res){

try {
  
let{fullname, email, password}=req.body;


let userc= await userModel.findOne({email:email});
if(userc)return res.status(401).send("you already have an account");


let salt= await bcrypt.genSalt(10);
let hashed_Password= await bcrypt.hash(password, salt);


    let user = await userModel.create({
        email,
        password:hashed_Password,
        fullname

    })

    let token=generateTokens(user);
    res.cookie("token",token);
    res.send("user registered successfully");
    


} catch (error) {
    console.log(error.message)
}


}