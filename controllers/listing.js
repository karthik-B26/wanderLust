
const Listing = require("../models/listing.js");




module.exports.index=(async (req, resp) => {
  let result = await Listing.find();
  resp.render("listing", { result });
})
module.exports.newlisting=(async (req, resp) => {
    let listing1 = new Listing({ ...req.body.Listing,owner:resp.locals.user.id });
    await listing1.save();
    req.flash("success", "New Listing Created");
    resp.redirect("/listings");
})
module.exports.editpage=(async (req, res) => {
    let { id } = req.params;

    let result = await Listing.findById(id);

    res.render("edit", { result });
})
module.exports.indvidullisting=(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findById(id).populate("owner").populate({
    path: "reviews",
    populate: {
        path: "owner"
              }
});;
  resp.render("onelisting", { result });
})
module.exports.updatedb=(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
   req.flash("success", " Listing Edited");
  resp.redirect(`/listings/${id}`);
})
module.exports.delete=(async (req, resp) => {
  let { id } = req.params;
  let result = await Listing.findByIdAndDelete(id);
   req.flash("success", " Listing Deleted");
  resp.redirect(`/listings`);
})
