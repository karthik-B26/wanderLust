const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
module.exports.isLogedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        req.flash(
            "error",
            "You must be logged in to perform the action"
        );

        return res.redirect("/login");
    }

    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,resp,next)=>{
    const {id}=req.params;
    let listing =await Listing.findById(id)
    if(!listing.owner.equals(resp.locals.user._id)){
        req.flash("error","not authrized fuckerr")
        return resp.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewOwner = async (req, res, next) => {
    const { reviewid } = req.params;

    let review = await Review.findById(reviewid);

    if (!review.owner.equals(res.locals.user._id)) {
        req.flash("error", "You are not authorized to delete this review");
        return res.redirect(`/listings/${req.params.id}`);
    }

    next();
};