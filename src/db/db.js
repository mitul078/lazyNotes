const mongoose = require("mongoose")
require("dotenv").config()

function connectToDB(){
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("connected to database")
    })
}

module.exports = connectToDB