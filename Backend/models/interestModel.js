const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  img:String,
  title: String,
  date: String,
  content: String,
});
const Interest = mongoose.model("Interest", interestSchema);
module.exports = Interest;
