const express=require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/customerror");
const { ReviewSchema } = require("../validation/validateReview.js");


function validatereview(req, res, next) {
    const { error } = ReviewSchema.validate(req.body);

    if (error) {
        return next(new ExpressError(400, error.message));
    }

    next();
}

//psot rew on reviews
router.post("/",validatereview,wrapAsync(async (req,res)=>{
    let { id } = req.params;
     let listing1= await Listing.findById(id);
     let review1 = new Review({...req.body.review})
      listing1.reviews.push(review1);
     await review1.save()
     await listing1.save()
     res.redirect(`/listings/${id}/`)
}))
module.exports=router;