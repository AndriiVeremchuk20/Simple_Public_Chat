const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { hashPassword, comparePassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const User = require('../database/schemas/User');
const Roles = require('../database/schemas/Roles');
const { secret } = require('../config');
const router = Router();

const generateAccessTocken = (id, roles) => {
    const payload = {
        id,
        roles,
    }  
    return jwt.sign(payload, secret, {expiresIn: "1h"});
}

router.post('/registration',
    [
        check("username", "Uncorrect username").isLength({ min: 4, max: 12 }),
        check("email", "Uncorrect email").isEmail(),
        check("password", "Uncorrect password").isLength({ min: 4 }),
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).send({ msg: "uncorrect request", errors });
            }

            const { username, email, avatarUrl } = req.body;
            const userDB = await User.findOne({ username });

            if (userDB) {
                res.status(400).send({ msg: `Username '${username}' alredy exist` });
            }
            else {
                const userRole = await Roles.findOne({ value: "USER" });
                const password = hashPassword(req.body.password);
                const newUser = await User.create({ username, email, avatarUrl, password, roles: [userRole.value] });
                res.status(201).send({ msg: "Registration successful" });
            }

        } catch (e) {
            console.error(e);
            res.status(500).send({ msg: "Registration server error" });
        }
    });

router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(500).send({ msg: `User '${username}' not found` });
        }

        if (await comparePassword(password, user.password)) {
            console.log(user);
            const tocken = generateAccessTocken(user._id, user.roles) 
            res.status(201).send({tocken});
        }
        else res.status(400).send({ msg: "Invalid password" });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Login server error" });
    }
});

//method to testing
router.get('/users', async (req, res) => {
    try{

        const users = await User.find();
        res.status(200).send(users);

    }catch(e){
        console.error(e);
        res.status(500).send({msg: "Server error"})
    }
});

router.get("/user", async (req, res) => {
    const { id } = req.query;
    const user = await User.findOne({ _id: id });
    const roles = await Roles.find(user.roles);
    console.log(roles);
    res.status(200).send(user);
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

