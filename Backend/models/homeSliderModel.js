const mongoose =require('mongoose');

const homeSliderSchema= new mongoose.Schema({
      img:String,
      title:String,
      description:String,
      dateTime:String,
      location:String,
      sport:String
});

const HomeSlider=mongoose.model("HomeSlider",homeSliderSchema);
module.exports=HomeSlider;