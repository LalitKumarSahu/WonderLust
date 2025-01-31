const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/Expresserror.js");

//const{reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")

//------conrollers------->
const reviewController = require("../controllers/reviews.js");


//--validateReview ko middleware.js me as a middleware----->

// ------Reviews----->
//----post review Route---->
//--as a middleware validateReview ko pass kar denge-->

//---"/listings/:id/reviews"
router.post("/",isLoggedIn, validateReview,
 wrapAsync(reviewController.createReview));

//----Delete Review Route--->
//"/listings/:id/reviews/:reviewId"
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.destroyReview));
module.exports = router;





// --ye app.js se cut kiya hai---->

// ------Reviews----->
//----post review Route---->
//--as a middleware validateReview ko pass kar denge-->
// app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req, res) =>{
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);

//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();

//   // console.log("new review saved");
//   // res.send("new review saved");
//   res.redirect(`/listings/${listing._id}`);

// }));

// //----Delete Review Route--->
// app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res) => {
//   let { id, reviewId } = req.params;
//   console.log("Listing ID:", id);
//   console.log("Review ID:", reviewId);
// //reviews arr she jo bhi reviewid match kregi vo delete ho jayega
// await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);
//   res.redirect(`/listings/${id}`);
// }));
