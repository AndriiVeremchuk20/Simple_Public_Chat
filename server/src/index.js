const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const { PORT } = require('./config');

require('./database')

const app = express();

const corsOptions = {
   origin:'*', 
   credentials:true, 
   optionSuccessStatus:200,
}

mongoose.set('strictQuery', false);

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


app.use((req, res, next)=>{
    console.log(`${req.method}:${req.url}, Body: ${Object.keys(req.body)}`);
    next();
});

app.use('/auth', authRoute);


app.listen(PORT, ()=> console.log(`listen port ${PORT}`));
