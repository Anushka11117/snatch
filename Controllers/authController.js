const userModel=require("../models/user-model")
const  {comparePass } = require("../utils/decryptPass");
const { hashPass } = require("../utils/encryptPass");
const { generateTokens } = require('../utils/generate token');



module.exports.registerUser=async function(req,res){

try {
  
let{fullname, email, password}=req.body;


let ifUser= await userModel.findOne({email:email});
if (ifUser) {     
    // req.flash("message" , "This email is already registered");
    // res.redirect("/");
    res.send("already registered")
  }

  const hashedPass = await hashPass(password);

    let user = await userModel.create({
        email,
        password:hashedPass,
        fullname

    })

    const token=generateTokens(user);
    res.cookie("token",token);
    // req.flash("message" , "Account created, you can login now");
    // res.redirect("/");
    res.send("created")
} 
catch (error) { res.send(error.message);}
}


  module.exports.loginUser =async (req, res) => {
    try {
      let { email, password } = req.body;
      let ifUser = await userModel.findOne({ email: email });
      if (!ifUser) {
        //  req.flash("message" ,"Email or password is incorrect");
        //  res.redirect('/')
        res.send("create first")
      }
       else {
        let user = ifUser;
        let isMatch = await comparePass(password , user.password);
       if (!isMatch) {
        // req.flash("message" ,"Email or password is incorrect");
        // res.redirect('/')
       }
       if(isMatch) {
         const token = generateTokens(user);
         res.cookie("token" , token)
        //  console.log("redirecting")
        //  res.redirect("/shop")
        res.send('you can login')
         }
      }
    } catch (error) {
      res.send(error.message);
    }
  };