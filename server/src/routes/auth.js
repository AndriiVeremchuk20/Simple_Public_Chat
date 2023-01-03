const { Router } = require('express');
const User = require('../database/schemas/User');
const { hashPassword } = require('../utils/helpers');

const router = Router();

router.post('/login', async (req, res) => {
    console.log(req.body);
});

router.post('/registration', async (req, res) => {
    const { username, email, avatarUrl } = req.body;
    const UserDB = await User.findOne({$or: [{username},{email}]});

    if(UserDB){
        res.status(400).send({msg:"Username alredy exist"});
    }
    else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await User.create({username, email, avatarUrl, password});
        res.send(201);
    }

});

//method to testing
router.get('/users', async (req,res)=>{
    const users =  await User.find();
    res.send(users);
})

module.exports = router;

/*

router.post('/login', async (req, res)=>{
    const { username, password } = req.body;
    if(!username || !password) return res.send(400);
    const userDB = await User.findOne({username});
    if(!userDB) return res.send(401);
    const isValid = comparePassword(password, userDB.password);
    if(isValid){
        console.log("all good");
        res.send(200);
    }else{
        console.log("all bad");
        res.send(401);
    }

});
*/
/*
router.post('/registration', async (req, res)=>{
    const { username, email } = req.body;

    const UserDB = await User.findOne({$or: [{username},{email}]});

    if(UserDB){
        res.status(400).send({msg: "Username or email alredy exist"});
    }
    else {
        const password = hashPassword(req.body.password);
        console.log("good")
        console.log(password);
        const newUser = await User.create({username, password, email});
        res.send(201);
    }
})
*/

