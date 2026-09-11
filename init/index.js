require("dotenv").config();
const mongoose=require("mongoose");
const data=require("./data.js");
const Listing=require("../models/listing.js");
async function main() {
    await mongoose.connect("mongodb+srv://karthikovis_db_user:karthik@cluster0.lty6j0k.mongodb.net/?appName=Cluster0");
}

main().then(resp=>{console.log(resp)}).catch(err=>{console.log(err.message)});
const  initdb =async ()=>{
   await Listing.deleteMany({})
let newdata = data.map((obj) => ({
    ...obj,
    owner: "6aa2b9fffef480bfebd0595a"
}));
   console.log(newdata)
   await Listing.insertMany(newdata)
}
initdb();