const express=require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/WrapAsync");
const {isLogedIn,isOwner,validatelisting} = require("../middlewares.js")
const listingcontroller=require("../controllers/listing.js")

const { ReviewSchema } = require("../validation/validateReview.js");


// get listss
router.get("/",wrapAsync(listingcontroller.index));
//new listing
router.get("/new", isLogedIn,(req, resp) => {resp.render("new");});

//post lsiting into db and redirect
router.post("/", isLogedIn,validatelisting,wrapAsync(listingcontroller.newlisting));

//edit page
router.get("/:id/edit", isLogedIn,isOwner, wrapAsync(listingcontroller.editpage));

//get indvidual listing
router.get("/:id", wrapAsync(listingcontroller.indvidullisting) );

//update and redirect ;
router.put("/:id",isLogedIn,isOwner,validatelisting, wrapAsync(listingcontroller.updatedb));

//Delete ;
router.delete("/:id",isLogedIn,isOwner, wrapAsync(listingcontroller.delete));

module.exports=router;