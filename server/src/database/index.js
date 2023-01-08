const mongoose = require("mongoose");
const { dbUrl } = require('../config');

mongoose.connect(dbUrl)
.then(()=>{console.log("connected to database")})
.catch((error)=>{console.log(error)});