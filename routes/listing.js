const express = require("express");
const router = express.Router();

const wrapAsync = require("../util/wrapAsync.js");

//const ExpressError = require("../util/Expresserror.js");
//const{listingSchema} = require("../schema.js");

const Listing = require("../models/listing.js");

const {isLoggedIn,isOwner,validateListing}  = require("../middleware.js");

//-----controllers---->
const listingController = require("../controllers/listing.js");

const privacyController = require("../controllers/privacy.js");

//multer---for image upload------>
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})


//schema validate ko fix -- joi
// cut and create a middleware in middleware.js--->

//-----Router.route-------------->
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing,wrapAsync(listingController.createListing));

// .post( upload.single('listing[image]'),(req, res)=>{
//   res.send(req.file);
// })



// Airbnb host page route
router.get("/airbnb", listingController.airbnbPage);




//New route - "/listings/new"
router.get("/new", isLoggedIn, listingController.renderNewForm)

// router.get("/search", wrapAsync(async (req, res) => {
//   let query = req.query.q;
//   let allListings;

//   if (!query || query.trim() === "") {
//     allListings = await Listing.find({});
//   } else {
//     allListings = await Listing.find({
//       title: { $regex: query, $options: "i" }
//     });
//   }

//   res.render("listings/index.ejs", { allListings, query });
// }));



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,
  upload.single('listing[image]'),
  validateListing,
   wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing))


//Index route /listings  --- router.route me set krenge uper-->
//router.get("/",wrapAsync(listingController.index));

//New route - "/listings/new"
//router.get("/new", isLoggedIn, listingController.renderNewForm)

// Show route ->"/listings/:id"--router.route me set krenge uper-->
//router.get("/:id", wrapAsync(listingController.showListing));

//Create Route -> /listings--- router.route me set krenge uper-->
// router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Edit route ->/listings/:id/edit
router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(listingController.renderEditForm));

//Update Route  ->/listings/:id-router.route me set krenge uper-->
// router.put("/:id", isLoggedIn,isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete Route ->/listings/:id--router.route me set krenge uper-->
// router.delete("/:id", isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));


module.exports = router;


//Index route
// router.get("/listings",wrapAsync(async(req,res) =>{
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", {allListings});
// }));
//New route
// router.get("/listings/new", (req,res) =>{
//   res.render("listings/new.ejs");
// })

// Show route
// router.get("/listings/:id", wrapAsync(async(req, res) =>{
//   let{id} = req.params;
//   const listing = await Listing.findById(id).populate("reviews");
//   res.render("listings/show.ejs", {listing});
// }));

//Create Route


// router.post("/listings",validateListing, wrapAsync(async(req,res,next)=>{
// //console.log(req.body); // Check the incoming form data
// // if(!req.body.listing){
// //   throw new Expresserror(404, "send valid data for listing")
// // }

// // let result = listingSchema.validate(req.body);
// // console.log(result);
// // if(result.error){
// //   throw new ExpressError(400, result.error);
// // }

   
//     //let listing = req.body.listing;
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//     // console.log(listing);

// }));

//Edit route
// router.get("/listings/:id/edit", wrapAsync(async(req,res) =>{
//   let{id} = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs",{listing});
// }));

//Update Route
// router.put("/listings/:id",validateListing, wrapAsync(async(req, res) =>{
//   // if(!req.body.listing){
//   //   throw new Expresserror(404, "send valid data for listing")
//   // }
//   let {id} = req.params;
//   await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   res.redirect(`/listings/${id}`);
// }));

// Delete Route
// router.delete("/listings/:id", wrapAsync(async(req,res) =>{
//   let {id} = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// }));