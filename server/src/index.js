const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');

require('./database')

const app = express();
const PORT = 8080;

const corsOptions = {
   origin:'*', 
   credentials:true, 
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', authRoute);

app.use((req, res, next)=>{
    console.log(`${req.method}:${req.url}`);
    next();
})

app.listen(PORT, ()=> console.log(`listen port ${PORT}`));
