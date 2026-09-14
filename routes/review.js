const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/customerror");


const { isLogedIn, isReviewOwner,validatereview } = require("../middlewares.js");
const reviewcontroller=require("../controllers/review.js")



// post review
router.post("/",isLogedIn,validatereview,wrapAsync(reviewcontroller.postreview));

// delete review
router.delete("/:reviewid", isLogedIn, isReviewOwner, wrapAsync(reviewcontroller.delete));

module.exports = router;