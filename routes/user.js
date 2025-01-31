const express = require("express");
const router = express.Router({mergeParams:true});

const User =require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//------controllers lo require-------->
const userController = require("../controllers/user.js");

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

module.exports = router;