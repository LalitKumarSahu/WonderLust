const express = require("express");
const router = express.Router({mergeParams:true});

const User =require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//------controllers lo require-------->
const userController = require("../controllers/user");

//-----------router.rote--------------->
router.route("/signup")
.get(userController.renderSignupForm )
.post(wrapAsync(userController.signup))

router.route("/login")
.get( userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login', failureFlash:true}),userController.login)

//-------signup form and signup---------->
// router.get("/signup", userController.renderSignupForm )

// router.post("/signup", wrapAsync(userController.signup))

//-------/signup-------->

//-------login---------->
// router.get("/login", userController.renderLoginForm);

// router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login', failureFlash:true}),userController.login)

//-------logout------------>
router.get("/logout", userController.logout)

// profile route
// router.get("/:id/profile", userController.renderProfile);
router.get("/:id/profile", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("users/profile", { user });
});

// edit form
router.get("/:id/edit", userController.renderEditForm);

// update profile
router.put("/:id", userController.updateProfile);

module.exports = router;