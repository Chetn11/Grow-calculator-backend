// importing all moduls
const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { authentication } = require("./middleware/authentication");
const { userController } = require("./controller/userController");
const { investmentController } = require("./controller/investmentController");
const { profileController } = require("./controller/profileController");

const app=express();
app.use(cors());


app.use(express.json());

app.get("/",(req,res)=>{
  res.send({message:"Grow Calculator Api is Working"});
});



//for login and signup
app.use("/verify",userController);

// profile and investment
app.use(authentication);
app.use("/investment",investmentController,authentication);
 app.use("/profile",profileController,authentication)



app.listen(8080,async()=>{
    try {
       await connection
       console.log("Connected to MongoDB");
    } catch (error) {
        console.log(err);
        console.log("error while connecting to MongoDB");
      }
      console.log(`App is running on port 8080`);
    });