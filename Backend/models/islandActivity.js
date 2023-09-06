const mongoose=require('mongoose');

const islandActivitySchema= new mongoose.Schema({
    url:String,
    enthusiam:String,
    activity:String,
    date: String
})

const IslandActivityModel= mongoose.model('IslandActivity',islandActivitySchema);
module.exports=IslandActivityModel;