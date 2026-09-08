const express=require("express")
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../validation/vailidateschema.js");
const wrapAsync = require("../utils/WrapAsync");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/customerror");


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
router.get("/new", (req, resp) => {
  resp.render("new");
});


//post lsiting into db and redirect
router.post("/", validatelisting,wrapAsync(async (req, resp) => {
    let listing1 = new Listing({ ...req.body.Listing });
    await listing1.save();
    resp.redirect("/listings");
  
}));

//edit page
router.get("/:id/edit",wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findById(id);
  resp.render("edit", { result });
})) ;


//get indvidual listing
router.get("/:id", wrapAsync (async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findById(id).populate("reviews");
  resp.render("onelisting", { result });
}));





//update and redirect ;
router.put("/:id",validatelisting, wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  resp.redirect(`/listings/${id}`);
}));

//Delete ;
router.delete("/:id", wrapAsync(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndDelete(id);
  resp.redirect(`/listings`);
}));

module.exports=router;