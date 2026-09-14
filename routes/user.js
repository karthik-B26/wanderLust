const express=require("express")
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const usercontroller=require("../controllers/user.js")


router.get("/signup",(req,resp)=>{resp.render("signup")})

router.post("/signup",usercontroller.signup);

router.get("/login", (req, res) => {res.render("login");});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Invalid username or password"
    }),usercontroller.login
);

router.get("/logout",usercontroller.logout)


module.exports = router;