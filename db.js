const mongoose=require("mongoose");


const connection=mongoose.connect("mongodb+srv://chetan:chetan1997@cluster0.08syghj.mongodb.net/grow");

module.exports={connection};