require("dotenv").config();
const express=require("express")
const app=express();
const ejs=require("ejs")
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate")
const path=require("path")
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
const Listing = require("./models/listing.js")
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
const methodOverride = require('method-override');
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}
//satrt server 
const startserveranddb=()=>{
    app.listen(1000,()=>{
        console.log("server started at http://localhost:1000")
    })
    main().then(resp=>{console.log("data base and server intialized")}).catch(err=>{console.log(err.message)});
}
// get listss

app.get("/Listings", async (req, resp) => {
    let result = await Listing.find();
    resp.render("listing", { result });
});
//new listing 
app.get("/listings/new",(req,resp)=>{
    resp.render("new");
})
//post lsiting into db and redirect 
app.post("/listings",async (req,resp)=>{
    try {
        // Corrected: Removed the redundant 'await' before 'new Listing'
        let listing1 = new Listing({ ...req.body.Listing });
        
        // This is where the database call actually happens asynchronously
        await listing1.save();
        
        resp.redirect("/listings");
    } catch (err) {
        console.error("Validation or Save Error:", err.message);
        resp.status(500).send(`Failed to create listing: ${err.message}`);
    }

})
//get indvidual liast
app.get("/listings/:id",async(req,resp)=>{
    let {id}=req.params
   let result =await Listing.findById(id)
   resp.render("onelisting",{result});
})
//edit page 
app.get("/listings/:id/edit",async(req,resp)=>{
    let {id}=req.params
   let result =await Listing.findById(id)
   resp.render("edit",{result});
})


//update and redirect ;
app.put("/listings/:id",async(req,resp)=>{
   let {id}=req.params
   let result =await Listing.findByIdAndUpdate(id,{...req.body.Listing})
   resp.redirect(`/listings/${id}`)
})
app.delete("/listings/:id",async(req,resp)=>{
   let {id}=req.params
   let result =await Listing.findByIdAndDelete(id)
   resp.redirect(`/listings`)
})

startserveranddb();