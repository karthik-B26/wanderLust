require("dotenv").config();
const mongoose=require("mongoose");
const data=require("./data.js");
const Listing=require("../models/listing.js");
async function main() {
    await mongoose.connect("mongodb+srv://karthikovis_db_user:karthik@cluster0.lty6j0k.mongodb.net/?appName=Cluster0");
}
main().then(resp=>{console.log(resp)}).catch(err=>{console.log(err.message)});
const  initdb =async ()=>{
   await Listing.deleteMany({}).then(res=>console.log(res));
   await Listing.insertMany(data).then(res=>console.log(res)).catch(err=>{console.log(err.message)})
   console.log("hi");
}
initdb();