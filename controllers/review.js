
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { ReviewSchema } = require("../validation/validateReview.js");

module.exports.postreview=(async (req, res) => {
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

module.exports.delete=(async (req,res)=>{
        let { id, reviewid } = req.params;

        await Listing.findByIdAndUpdate(
            id,
            { $pull: { reviews: reviewid } }
        );

        await Review.findByIdAndDelete(reviewid);

        res.redirect(`/listings/${id}/`);
    })