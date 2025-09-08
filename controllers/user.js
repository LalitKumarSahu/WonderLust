
const User = require("../models/user");

module.exports.renderSignupForm = (req, res)=>{
      res.render("users/signup.ejs");
}
module.exports.signup=async(req,res) =>{
 try{
  let {username, email, password} = req.body;
  const newUser = new User({email, username});
  const registerdUser = await User.register(newUser, password);
  console.log(registerdUser);
  
  //automatic login after signup
  req.login(registerdUser, (err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","Welcome to Wanderlust!");
    res.redirect("/listings");
  })

  
 }catch(e){
  req.flash("error", e.message);
  res.redirect("/signup");
 }
}

module.exports.renderLoginForm=(req,res)=>{
  res.render("users/login.ejs");
}
module.exports.login = async(req,res)=>{
  req.flash("success","Welcome back to Wanderlust! You are logged in!");
  // res.redirect("/listings");
  //res.redirect(res.locals.redirectUrl);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  })
}



module.exports.renderProfile = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);

  if (!user) {
    req.flash("error", "User not found!");
    return res.redirect("/listings");
  }

  res.render("users/profile", { user });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    req.flash("error", "User not found!");
    return res.redirect("/listings");
  }
  res.render("users/edit", { user });
};

//Update profile
module.exports.updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const { username, about } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { username, about },
    { new: true }
  );

  req.flash("success", "Profile updated successfully!");
  res.redirect(`/users/${id}/profile`);
};
