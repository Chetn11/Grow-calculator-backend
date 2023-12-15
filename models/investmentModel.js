const mongoose = require("mongoose");
const { UserModel } = require("./userModel");

const investmentSchema = mongoose.Schema({
    annualInstalmentAmount:{type:Number,required:true},
    annualInterestRate:{type:Number,required:true},
    totalNUmbersOfYears:{type:Number,required:true},
    totalInvestmentAmount:{type:Number},
    totalInterestGained:{type:Number},
    totalMaturityValue:{type:Number},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel",required:true},
})

const InvestmentModel = mongoose.model("investment",investmentSchema)

module.exports = {InvestmentModel}
