const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number, require:true},
    password:{type:String,required:true},
    confirm_password:{type:String,require:true}
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel};