const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/neom",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("the connection is esatablished...");
}).catch((err)=>{
    console.log("connection failed",err);
})