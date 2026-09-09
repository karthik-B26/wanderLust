const mongoose = require("mongoose");
const review  = require("./review");


const ListingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        filename: {
            type: String,
            default: "default-image"
        },
       url: {
        type: String,
        default: "https://makingspacematter.in/assets/img/illusstration/home-default.png",
        set: (v) => v === "" ? undefined : v
        }
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    country: {
        type: String
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports=Listing;