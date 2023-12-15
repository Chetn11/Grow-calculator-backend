const express =require("express");
const { UserModel } = require("../models/userModel");
const { InvestmentModel } = require("../models/investmentModel");

const profileController=express.Router();

profileController.get("/getProfile/:userId",async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user=await UserModel.findById(userId);
        if(!user){
            return res.json({status:"User doesn't Exist"});
        }

        const investments=await InvestmentModel.find({user:userId});
        res.json({
            status: "Profile retrieved successfully",
            profile: {
              user,
              investments,
            },
          });

    } catch (error) {
      console.log(error);
      res.json({status:"Server error"}) 
    }
})

module.exports={profileController};

