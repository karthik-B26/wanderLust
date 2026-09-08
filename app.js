require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const wrapAsync = require("./utils/WrapAsync");
const ExpressError = require("./utils/customerror");
const { listingSchema } = require("./vailidateschema.js");
const { ReviewSchema } = require("./validateReview.js");
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//satrt server
const startserveranddb = () => {
  const PORT = process.env.PORT || 1000;

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
  main()
    .then((resp) => {
      console.log("data base and server intialized");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
function validatelisting(req, res, next) {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        return next(new ExpressError(400, error.message));
    }

    next();
}
function validatereview(req, res, next) {
    const { error } = ReviewSchema.validate(req.body);

    if (error) {
        return next(new ExpressError(400, error.message));
    }

    next();
}


// get listss
app.get("/listings",wrapAsync(async (req, resp) => {
  let result = await Listing.find();
  resp.render("listing", { result });
}));


//new listing
app.get("/listings/new", (req, resp) => {
  resp.render("new");
});


//post lsiting into db and redirect
app.post("/listings", validatelisting,wrapAsync(async (req, resp) => {
    let listing1 = new Listing({ ...req.body.Listing });
    await listing1.save();
    resp.redirect("/listings");
  
}));


//get indvidual listing
app.get("/listings/:id", wrapAsync (async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findById(id).populate("reviews");
  resp.render("onelisting", { result });
}));


//edit page
app.get("/listings/:id/edit",wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findById(id);
  resp.render("edit", { result });
})) ;


//update and redirect ;
app.put("/listings/:id",validatelisting, wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  resp.redirect(`/listings/${id}`);
}));

//Delete ;
app.delete("/listings/:id", wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndDelete(id);
  resp.redirect(`/listings`);
}));

//psot rew on reviews
app.post("/listings/:id/reviews",validatereview,wrapAsync(async (req,res)=>{
    let { id } = req.params;
     let listing1= await Listing.findById(id);
     let review1 = new Review({...req.body.review})
      listing1.reviews.push(review1);
     await review1.save()
     await listing1.save()
     res.redirect(`/listings/${id}/`)
}))


 app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

app.use((err,req,resp,next)=>{
   let { statusCode = 500, message = "Something went wrong" } = err;
  resp.status(statusCode).render("error", { message });
})
startserveranddb();
