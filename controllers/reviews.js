const  Listing = require("../models/listing");
const Review = require("../models/review");

 module.exports.createReview = async(req, res) =>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    //---setting authorization for review------>
    newReview.author = req.user._id;
    //console.log(newReview);
    //-------->
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
  
    // console.log("new review saved");
    // res.send("new review saved");
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
  
  }
   
  module.exports.destroyReview = async(req, res) => {
     let { id, reviewId } = req.params;
     console.log("Listing ID:", id);
     console.log("Review ID:", reviewId);
   //reviews arr she jo bhi reviewid match kregi vo delete ho jayega
   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
     await Review.findByIdAndDelete(reviewId);
     req.flash("success", "Review Deleted");
     res.redirect(`/listings/${id}`);
   }