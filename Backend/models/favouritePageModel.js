const mongoose=require("mongoose");

const favouritePageSchema= new mongoose.Schema({
    img:String,
    time:String,
    title:String,
    type:String
});
const FavouritePage=mongoose.model("FavouritePage",favouritePageSchema);
module.exports=FavouritePage;