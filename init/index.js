const mongoose = require("mongoose")

const initData = require("./data.js");
const Listing = require("../models/listing.js");




main().then(()=>{
  console.log('connection sucess');
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async() =>{
  // jo already data hai use delte krenge
  await Listing.deleteMany({}); 

  initData.data = initData.data.map((obj)=>({...obj, owner:"67945bac9bcb6b1abb48affe"}));

  //fir apne data ko insert karenge
  await Listing.insertMany(initData.data);

  console.log('data was initialize');
};
initDB();