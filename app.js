//-----dotenv--------->
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
//console.log(process.env.SECRET);

//----------------------->

const express = require("express");
const app = express();

let port = 3000;

const path = require("path"); // when we use ejs

//post ko put req me convert karne ke liye
const methodOverride = require("method-override");

// bahut sari templet(layout) ko create karen me help karat hai
const ejsMate = require("ejs-mate");

const wrapAsync = require("./util/wrapAsync.js");
const ExpressError = require("./util/Expresserror.js");

//JOI schema
const{listingSchema, reviewSchema} = require("./schema.js");

const Review = require("./models/review.js")

app.set("view engine", "ejs");// when we use ejs
app.set("views", path.join(__dirname, "views"));

// Show route me jo data aa rha hai use parse kar paye
app.use(express.urlencoded({extended:true})); 

app.use(methodOverride("_method"));

// ejsMate
app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,"/public")));

const mongoose = require("mongoose");
//const Listing = require("./models/listing.js");
//const wrapAsync = require("./util/wrapAsync.js");
const Expresserror = require("./util/Expresserror.js");
//const{listingSchema,reviewSchema} = require("./schema.js");
//const Review = require("./models/review.js");

//express-session
const session = require("express-session");
const MongoStore = require('connect-mongo');
//connect-flash
const flash = require('connect-flash');

//-1-passport-local--->
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");

//signup -> user.js require--->
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
  console.log('connection sucess');
}).catch(err => console.log(err));


async function main() {
  await mongoose.connect(dbUrl);
}
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }

//------mongo session store------------>
const store =  MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
}) 
store.on("error", (err) =>{
  console.log("ERROR in MONGO SESSION STORE",err);
})

//--session option-->
const sessionOptions = {
       store,
       secret:process.env.SECRET,
       resave:false,
       saveUninitialized:true,
       cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
       }
};

// app.get("/", (req,res)=>{
//   res.send("root is working")
// });



app.use(session(sessionOptions));
//connect flash
app.use(flash());

//--2------passport-local---------->
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());// store karana
passport.deserializeUser(User.deserializeUser());//unstore rmv

//---------------------------------->
app.use((req, res, next) =>{
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
  //  console.log(res.locals.success);
  
  //adding style for loging & signup
  res.locals.currUser = req.user;
   next();
})
//----3-----demo user-------------->
/*
app.get("/demouser", async(req,res)=>{
  let fakeUser = new User({
    email: "student@gmail.com",
    username:"delta-student",
  });
  let registerdUser = await User.register(fakeUser, "helloworld");
  res.send(registerdUser);
})
  */
//-------/demouser--------------------------->

//schema validate ko fix -- joi
//validatelisting---cut and past to the listing.js

// rating review from ko validate using joi
//validateReview cut & past review.js

//index route she delte route ko cut karke listing.js pasr kar diya

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// ------Reviews----->
//----post review Route---->
// post review route and delete review route cut and paste review.js
//----Delete Review Route--->



// app.get("/testListing", async(req,res)=>{
//     let sampleListing = new Listing({
//       title:"My New Villa",
//       description:"By the beach",
//       price:1200,
//       location:"calangute, Goa",
//       country:"India",
//     })
//     await sampleListing.save();
//     console.log('sample was save');
//     res.send("successfull testing");
// })

app.all("*", (req,res,next)=>{
  next(new Expresserror(404,"Page Not Found!"));
})

app.use((err, req,res,next) =>{
  let{statusCode = 500, message="something went wrong"} = err;
  res.status(statusCode).render("listings/error.ejs", {message});
  //res.status(statusCode).send(message);
})
app.listen(port, () =>{
  console.log(`app is listining at port ${port}`);
})

