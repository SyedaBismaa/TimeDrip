const mongoose = require('mongoose');

function connetDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to DB");
        
    })
    .catch((error)=>{
        console.log("Error In connecting :", error);
        
    })
}

module.exports= connetDB;