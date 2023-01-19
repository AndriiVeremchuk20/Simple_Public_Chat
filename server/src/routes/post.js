const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../database/schemas/User');
const UserPosts = require('../database/schemas/UserPost');
const { secret } = require('../config');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const post = await UserPosts.find().sort({"createdAt": 1});
        
        res.status(200).send(post);
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
})

router.post('/new', authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const { text } = req.body;

        if (!text) {
            return res.status(400).send({ msg: "Empty post text" });
        }

        const user = await User.find({_id: id}).select('username avatarUrl email createdAt');
        const post = await UserPosts.create({ user: user, text: text });
        
        res.status(200).send({ msg: "Post create" });
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

module.exports = router;

/*
UserPostShema = {
    userId:{
        type: SchemaTypes.String,
        required: true,
    },
    text:{
        type: SchemaTypes.String,
        required: true,
    },
    likes: {
        type: SchemaTypes.Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date(),
    }
*/