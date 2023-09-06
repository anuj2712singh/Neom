const mongoose=require("mongoose");

const journeySchema=new mongoose.Schema({
    img:String,
    title:String,
    numOfGuest:String,
    date:String

});
const Journey=mongoose.model("Journey",journeySchema);
module.exports=Journey;