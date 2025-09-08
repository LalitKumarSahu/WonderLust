const Listing = require("../models/listing");


// module.exports.index = async(req,res) =>{
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", {allListings});
//} // replace with chatgpt code
module.exports.index = async (req, res) => {
 let { q } = req.query;
// console.log("Search query: ", q);

let allListings;
if (q && q.trim() !== "") {
  allListings = await Listing.find({
    title: { $regex: q, $options: "i" }
  });
} else {
  allListings = await Listing.find({});
}

res.render("listings/index.ejs", { allListings, query: q || "" });

};


// foote-Airbnb host page render controller
module.exports.airbnbPage = (req, res) => {
  res.render("includes/airbnb");   // views/includes/Airbnb.ejs
};






module.exports.renderNewForm = (req,res) =>{
  console.log(req.user);
   res.render("listings/new.ejs");
 }
 module.exports.showListing =async(req, res) =>{
      let{id} = req.params;
      const listing = await Listing.findById(id)
      .populate({
        path:"reviews",
        populate:{
        path:"author",
      }
    })
      .populate("owner");
      
      if(!listing){
        req.flash("error", "Listing you requested for does not exist !");
        res.redirect("/listings");
      }
      
      console.log(listing);
      res.render("listings/show.ejs", {listing});
    }

    module.exports.createListing =async(req,res,next)=>{
      /*console.log(req.body); // Check the incoming form data
      if(!req.body.listing){
        throw new Expresserror(404, "send valid data for listing")
      }
      
      let result = listingSchema.validate(req.body);
      console.log(result);
      if(result.error){
        throw new ExpressError(400, result.error);
      }
      */
          let url = req.file.path;
          let filename = req.file.filename;
          //console.log(url, "..", "filename");

          //let listing = req.body.listing;
          const newListing = new Listing(req.body.listing);
          //console.log(req.user);
       
          newListing.owner = req.user._id;
          
          newListing.image = {url, filename};

          await newListing.save();
          req.flash("success", "New Listing Created");
      
          res.redirect("/listings");
          // console.log(listing);
      
      }

      module.exports.renderEditForm = async(req,res) =>{
        let{id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
          req.flash("error", "Listing you requested for does not exist !");
          res.redirect("/listings");
        }
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
        res.render("listings/edit.ejs",{listing, originalImageUrl});
      }

      module.exports.updateListing  = async(req, res) =>{
        // if(!req.body.listing){
        //   throw new Expresserror(404, "send valid data for listing")
        // }
      
        //---setting authorization---->
        // cut at create a middleware in middleware.js--->
        //--->
        let {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
        //------------------->
        if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
      }
        //-------------------->

        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
      }
      module.exports.destroyListing = async(req,res) =>{
         let {id} = req.params;
         let deletedListing = await Listing.findByIdAndDelete(id);
         console.log(deletedListing);
         req.flash("success", "Listing Deleted");
         res.redirect("/listings");
       }