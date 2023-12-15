const express=require("express");
const { authentication } = require("../middleware/authentication");
const { InvestmentModel } = require("../models/investmentModel");

const investmentController=express.Router();

investmentController.post('/calculate',async(req,res)=>{
    try {
        const{annualInstalmentAmount,annualInterestRate,totalNUmbersOfYears}=req.body;

     
        const interestRate=annualInterestRate/100;
        const TotalInvestmentAmount=annualInstalmentAmount*totalNUmbersOfYears;

        const TotalMaturityValue=annualInstalmentAmount*(((1+interestRate)**totalNUmbersOfYears-1)/interestRate);

        const TotalInterestGained=TotalMaturityValue-TotalInvestmentAmount;


        const Investment=await InvestmentModel.create({
            annualInstalmentAmount,
            annualInterestRate,
            totalNUmbersOfYears,
            TotalInvestmentAmount,
            TotalMaturityValue,
            TotalInterestGained,
            user:req.userId
        });

        res.json({status:"Successful",
            result:{
                TotalInvestmentAmount,
                TotalInterestGained,
                TotalMaturityValue,
            },
            Investment,
        });

    } catch (error) {
        res.json({status:"Server Error"});
    }
})

module.exports={investmentController};