const express=require("express")
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");

router.get("/signup",(req,resp)=>{
    resp.render("signup")
})
router.post("/signup", async (req, resp, next) => {
    try {

        let newuser = new User({
            email: req.body.email,
            username: req.body.username
        });

       const user= await User.register(newuser, req.body.password);
        await req.login(user,(err)=>{
            if(err){ return next(err)}
            req.flash("success", `Account Created Welcome ${req.body.username}`);
            resp.redirect("/listings");
        })


        

    } catch (err) {

        req.flash("failure", "User Already Exists, please signup again");
        resp.redirect("/signup");

    }
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Invalid username or password"
    }),
    (req, res) => {


        req.flash(
            "success",
            `Welcome back ${req.body.username}`
        );

        res.redirect("/listings");
    }
);
router.get("/logout",(req,resp,next)=>{
    if(req.user){
         req.logout(err=>{
        if(err){
            return next(err)
        }
        req.flash("success","Loggedout sucessfully")
        resp.redirect("/listings")
     })
    }
    else{
        req.flash("failure","Already Logged out ")
        resp.redirect("/listings")
    }
    
})


module.exports = router;