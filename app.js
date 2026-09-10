require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session =require("express-session")
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/customerror");
const listing=require("./routes/listing");
const review=require("./routes/review");
const user=require("./routes/user");
const flash=require("connect-flash")
const passport =require("passport")
const passportl =require("passport-local")
const User=require("./models/user.js")
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
//satrt server
const startserveranddb = () => {
  const PORT = process.env.PORT || 1000;

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);

  });
  main().then((resp) => {console.log("data base and server intialized");}).catch((err) => {console.log(err.message); });};

app.engine("ejs", ejsMate); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const options ={
  secret:"secret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7 * 24 * 60 * 60 * 100,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true
  }
}
app.use(session(options))
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    res.locals.error = req.flash("error");
    next();
});
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportl(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use("/listings",listing)
app.use("/listings/:id/reviews",review)
app.use("/",user)

// app.get("/users",async (req,res)=>{
//   let newuser=new User({
//     email:"hello@getMaxListeners.com",
//     username:"santoshhh"
//   })
//   let result=await User.register(newuser,"h")
//   res.send(result)
// })

 app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});
app.use((err,req,resp,next)=>{
   let { statusCode = 500, message = "Something went wrong" } = err;
  resp.status(statusCode).render("error", { message });
})
startserveranddb();
