const jwt = require("jsonwebtoken");
const { secret } = require('../config');

module.exports = (req, res, next)=>{
    if(req.mehtod === "OPTIONS"){
        next();
    }

    try{
        const token = req.headers.authorization;
        
        if(!token){
            return res.status(403).send({msg: "User is not authorized"});
        } 

        const decodedData = jwt.verify(token, secret);
        console.log(decodedData);
        req.user = decodedData;
        next();

    }catch(e){
        console.error(e);
        res.status(500).send({msg: "Server error"});
    }
}
