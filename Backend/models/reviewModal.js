const mongoose=require("mongoose");

const reviewSchema= new mongoose.Schema({
    QualityOfEvents:Number,
    FacilityOfEvents:Number,
    StaffPoliteness:Number,
    ServicesAtEvents:Number,
    OperatorAtEvents:Number,
    ReviewMessage:String,
    ReviewerName:String,
}) ;

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;