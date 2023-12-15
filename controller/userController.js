const express = require("express");
const {UserModel}=require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const{name,email,mobile,password,confirm_password}=req.body;
    const user_exist=await UserModel.findOne({email});
    if(user_exist)
    {
        return res.json({message:"User already exist please go to login page"});
    }
    else{ 
        if(password===confirm_password)  // verifying password matching or not
    {
        bcrypt.hash(password, 8, async function(err, hash) {
            await UserModel.create({name,email,mobile,password:hash});
            return res.json({message:"Signup Successfull"});

    })
    }
    else{
        return res.json({message:"Password does not Match, please try again"})
    }
}});

userController.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });

  const hashed_password = user.password;
  try {
    bcrypt.compare(password, hashed_password, async function (err, result) {
      if (err || !result) {
        return json({ status: "User not Logged in" });
      }
      const secretKey = 12345;
      const token = jwt.sign({ userId: user._id }, "secretKey");
      res.json({
        status: "User Logged in SuccessFully",
        userIs: name,
        token: token,
      });
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = { userController };
