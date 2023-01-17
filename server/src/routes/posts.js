const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../database/schemas/User');
const UserPosts = require('../database/schemas/UserPost');
const { secret } = require('../config');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post('/post', authMiddleware, async (req, res) => {
    try{
        const { id } = req.user;
        const  {text, createdAt } = req.body;

        



    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
});