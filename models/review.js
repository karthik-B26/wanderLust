const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    comment: String,

    date: {
        type: Date,
        default: Date.now
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});


const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;