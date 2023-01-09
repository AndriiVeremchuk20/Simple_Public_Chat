const jwt = require("jsonwebtoken");
const { secret } = require('../config');

module.exports = (req, res, next)=>{
    if(req.mehtod === "OPTIONS"){
        next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            return res.starus(403).send({msg: "User is not authorized"});
        } 
        
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();

    }catch(e){
        console.error(e);
        res.starus(500).send({msg: "Server error"});
    }
}
