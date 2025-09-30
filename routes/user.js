const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//------controllers--------
const userController = require("../controllers/user");

//-----------signup routes--------------
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

//-----------login routes---------------
router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//-----------logout---------------------
router.get("/logout", userController.logout);

//-----------profile pages--------------

// helper middleware: user load karke res.locals.user me daal dega
const ensureUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/listings");
  }
  res.locals.user = user;
  next();
};

// profile main page with trips & connections
router.get("/:id/profile", ensureUser, (req, res) => {
  const user = res.locals.user;

  // Dummy trips data (baad me DB se fetch kar lena)
  const trips = [
    { place: "Manali", date: "Jan 2024" },
    { place: "Goa", date: "Dec 2023" }
  ];

  // Dummy connections data
  const connections = [
    { name: "Rohit Sharma", joined: "2022" },
    { name: "Aman Verma", joined: "2023" }
  ];

  res.render("users/profile", { 
    activeTab: "profile", 
    user, 
    trips, 
    connections 
  });
});


// about page
router.get("/:id/profile/about", ensureUser, (req, res) => {
  res.render("users/profile", { activeTab: "about", user: res.locals.user });
});

// Past trips
router.get("/:id/profile/trips", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("users/profile", { 
    activeTab: "trips", 
    user, 
    trips: user.trips || [] 
  });
});

// Connections
router.get("/:id/profile/connections", async (req, res) => {
  const user = await User.findById(req.params.id).populate("connections");
  res.render("users/profile", { 
    activeTab: "connections", 
    user, 
    connections: user.connections || [] 
  });
});



//-----------edit/update profile--------
router.get("/:id/edit", userController.renderEditForm);
router.put("/:id", userController.updateProfile);

module.exports = router;
