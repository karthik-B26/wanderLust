const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/customerror");
const { ReviewSchema } = require("../validation/validateReview.js");
const { isLogedIn, isReviewOwner } = require("../middlewares.js");

function validatereview(req, res, next) {
    const { error } = ReviewSchema.validate(req.body);

    if (error) {
        return next(new ExpressError(400, error.message));
    }

    next();
}

// post review
router.post(
    "/",
    isLogedIn,
    validatereview,
    wrapAsync(async (req, res) => {
        let { id } = req.params;

        try {
            let listing1 = await Listing.findById(id);

            let review1 = new Review({
                ...req.body.review,
                owner: res.locals.user._id
            });

            listing1.reviews.push(review1);

            await review1.save();
            await listing1.save();

            res.redirect(`/listings/${id}/`);
        } catch (e) {
            res.redirect(`/listings/${id}/`);
        }
    })
);

// delete review
router.delete("/:reviewid", isLogedIn, isReviewOwner, wrapAsync(async (req,res)=>{
        let { id, reviewid } = req.params;

        await Listing.findByIdAndUpdate(
            id,
            { $pull: { reviews: reviewid } }
        );

        await Review.findByIdAndDelete(reviewid);

        res.redirect(`/listings/${id}/`);
    })
);

module.exports = router;