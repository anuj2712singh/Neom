const mongoose=require("mongoose");

const signUpSchema=new mongoose.Schema({
  name:String,
  phone_number:Number,
  email:String,
  password:String
});
const User=mongoose.model("User",signUpSchema);
module.exports=User;