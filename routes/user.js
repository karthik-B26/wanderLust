const express=require("express")
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup",(req,resp)=>{
    resp.render("signup")
})
router.post("/signup", async (req, resp) => {
    try {
        let newuser = new User({
            email: req.body.email,
            username: req.body.username
        });
        let result = await User.register(newuser, req.body.password);
        req.flash("success", `Account Created Welcome ${req.body.username}`);
        resp.redirect("/listings");

    } catch (err) {
        req.flash("failure", "User Already Exists, please signup again");
        resp.redirect("/signup");
    }
});

router.get("/login",(req,resp)=>{
    resp.render("login")
})
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Invalid username or password"
    }),
    async (req, resp) => {
        req.flash("success", `Welcome back ${req.body.username}`);
        resp.redirect("/listings");
    }
);


module.exports = router;