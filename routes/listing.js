const express=require("express")
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../validation/vailidateschema.js");
const wrapAsync = require("../utils/WrapAsync");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/customerror");
const {isLogedIn,isOwner} = require("../middlewares.js")


function validatelisting(req, res, next) {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        return next(new ExpressError(400, error.message));
    }

    next();
}


// get listss
router.get("/",wrapAsync(async (req, resp) => {
  let result = await Listing.find();
  resp.render("listing", { result });
}));


//new listing
router.get("/new", isLogedIn,(req, resp) => {
  resp.render("new");
});


//post lsiting into db and redirect
router.post("/", isLogedIn,validatelisting,wrapAsync(async (req, resp) => {
    let listing1 = new Listing({ ...req.body.Listing,owner:resp.locals.user.id });
    await listing1.save();
    req.flash("success", "New Listing Created");
    resp.redirect("/listings");
}));

//edit page
router.get("/:id/edit", isLogedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;

    let result = await Listing.findById(id);

    res.render("edit", { result });
}));

//get indvidual listing
router.get("/:id", wrapAsync (async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findById(id).populate("owner").populate({
    path: "reviews",
    populate: {
        path: "owner"
              }
});;
  resp.render("onelisting", { result });
}));





//update and redirect ;
router.put("/:id",isLogedIn,isOwner,validatelisting, wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
   req.flash("success", " Listing Edited");
  resp.redirect(`/listings/${id}`);
}));

//Delete ;
router.delete("/:id",isLogedIn,isOwner, wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndDelete(id);
   req.flash("success", " Listing Deleted");
  resp.redirect(`/listings`);
}));

module.exports=router;