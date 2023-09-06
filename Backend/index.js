const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const bcrypt = require("bcrypt");
require("./db/config");

// =====================Requiring the Model=================
const User = require("./models/signUp");
const Slider = require("./models/sliderModel");
const Interest = require("./models/interestModel");
const Journey = require("./models/journeyModel");
const FavouritePage = require("./models/favouritePageModel");
const Recommendations = require("./models/recomModal");
const IslandActivity = require("./models/islandActivity");
const Review = require("./models/reviewModal");
const HomeSlider = require("./models/homeSliderModel");
// =======================getting the data =================

app.use(cors());
app.use(express.json());

app.post("/signUp", async (req, res) => {
  try {
    const input = req.body;
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const data = new User({
      email: input.email,
      phone_number: input.phone_number,
      name: input.name,
      password: hashedPassword,
    });
    // console.log(data.password);
    jwt.sign({ data }, secretKey, { expiresIn: "2h" }, async (err, token) => {
      if (err) {
        res.json({ msg: "can't generate the token" });
      } else {
        try {
          res.json({ data, token });
          const result = await data.save();
        } catch (error) {
          res.json({ msg: "error saving data to the database" });
        }
      }
    });
  } catch (error) {
    res.json({ msg: "server side error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const input = await req.body;
    const data = await User.findOne({ email: input.email }).select("+password");

    if (!data) {
      res.status(404).json({ msg: "User not found..." });
      return; // Return here to stop the code execution
    }

    const matchedPassword = await bcrypt.compare(input.password, data.password);
    console.log(matchedPassword);

    if (matchedPassword) {
      res
        .status(200)
        .send({ msg: "login", email: input.email, name: data.name });
    } else {
      res.status(401).send("invalid credentials...");
    }
  } catch (error) {
    res.status(500).send("can't login", error);
    console.log("err");
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await Slider.find();
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.send({ result: "can't fetch data.." });
    }
  } catch (err) {
    res.send("data can't be fetched...");
  }
});

app.get("/interest", async (req, res) => {
  try {
    const interest = await Interest.find();
    if (interest.length > 0) {
      res.status(200).send(interest);
    } else {
      res.status(400).send({ interest: "can't fetch the data.." });
    }
  } catch (err) {
    res.send("data can't be fetched...");
  }

  // res.send("the interest api is running");
});

app.get("/journey", async (req, res) => {
  try {
    const journey = await Journey.find();
    if (journey.length > 0) {
      res.status(200).json({ result: journey });
    }
  } catch (err) {
    res.status(400).send("err", err);
  }
});
app.get("/favourite", async (req, res) => {
  try {
    const favourite = await FavouritePage.find();
    if (favourite.length > 0) {
      res.status(200).json({ result: favourite });
    } else {
      res.status(400).json({ result: "No data found ..." });
    }
  } catch (err) {
    res
      .status(400)
      .json({ result: "can't fetch the favourite page data" + err });
  }
});
app.get("/recommendation", async (req, res) => {
  try {
    const recommendations = await Recommendations.find();
    if (recommendations.length > 0) {
      res.status(200).json({ result: recommendations });
    }
  } catch (err) {
    res.status(400).json({ result: `data not found..${err}` });
  }
});

app.get("/activity", async (req, res) => {
  try {
    const activity = await IslandActivity.find();
    if (activity.length > 0) {
      res.status(200).json({ result: activity });
    }
  } catch (error) {
    res.status(400).send("err", error);
  }
});

app.post("/review", async (req, res) => {
  try {
    const {
      quality,
      facilities,
      staff,
      services,
      operator,
      message,
      userName,
    } = req.body;
    // const reviewInput=req.body;
    const data = new Review({
      QualityOfEvents: quality,
      FacilityOfEvents: facilities,
      StaffPoliteness: staff,
      ServicesAtEvents: services,
      OperatorAtEvents: operator,
      ReviewMessage: message,
      ReviewerName: userName,
    });
    const result = await data.save();
    res.status(200).send({ result: result });
  } catch (err) {
    res.json({ result: "can't send the data.." });
  }
});

app.get("/review", async (req, res) => {
  try {
    const result = await Review.find();
    if (result.length > 0) {
      res.status(200).json({ result: result });
    } else {
      res.json({ msg: "no review found" });
    }
  } catch (error) {
    res.status(500).send("can't get the data..");
  }
});


app.post("/home-slider",async(req,res)=>{
  try{
     
  }catch(err){
    res.status(404).json({result:"Can't add the data.."});
  }
})
app.get("/home-slider", async (req, res) => {
  try {
    const result = await HomeSlider.find();
   if(result.length>0)
     {
      res.status(200).json({result:result});
     }
     else{
      res.status(404).json({result:"No data found "})
     }
  } catch (err) {
    res.status(500).json({ msg: "Cant get the data" });
  }
});

app.listen(port, () => {
  console.log(`listening to the port number ${port}`);
});
