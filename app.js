require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const ExpressError = require("./utils/customerror");
const listing=require("./routes/listing");
const review=require("./routes/review");


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

app.use("/listings",listing)
app.use("/listings/:id/reviews",review)

 app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});
app.use((err,req,resp,next)=>{
   let { statusCode = 500, message = "Something went wrong" } = err;
  resp.status(statusCode).render("error", { message });
})
startserveranddb();
