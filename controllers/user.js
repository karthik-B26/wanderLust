
const User = require("../models/user.js");


module.exports.signup= async (req, resp, next) => {
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
}

module.exports.login =(req, res) => {


        req.flash(
            "success",
            `Welcome back ${req.body.username}`
        );

        res.redirect("/listings");
    }

    module.exports.logout=(req,resp,next)=>{
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
    
}