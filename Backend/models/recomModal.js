const mongoose=require("mongoose");

const recommSchema=new mongoose.Schema({
    img:String,
    recomTitle:String,
    date:String,
    time:String

});
const Recommendations=mongoose.model("Recommendations",recommSchema);
module.exports=Recommendations;