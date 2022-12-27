const mongoose = require("mongoose");

const url = `mongodb://127.0.0.1:27017/twitterClon`;

mongoose.connect(url)
.then(()=>{console.log("connected to database")})
.catch((error)=>{console.log(error)});