const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  img: String,
  title: String,
  content: String,
  date: String,
  location: String,
  sportType: String,
});

const Slider = mongoose.model("Slider", sliderSchema);
module.exports = Slider;
