const { Router } = require('express');
const User = require('../database/schemas/User');
const UserPosts = require('../database/schemas/UserPost');
const Likes = require('../database/schemas/Likes');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const posts = await UserPosts.find().sort({createdAt: -1});
        res.status(200).send(posts);
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

        const user = await User.findOne({_id: id}).select('username avatarUrl email createdAt');
        const post = await UserPosts.create({ postedBy: user, text: text });
        
        res.status(200).send({ post });
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

router.get('/likes', authMiddleware, async(req, res)=>{
    try{
        const likes = await Likes.find({});
        res.status(200).send(likes);
    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
})

router.post('/like_post', authMiddleware, async(req,res)=>{
    try{
        const userId = req.user.id;
        const postId = req.body._id; 

        const user = await User.findOne({_id: userId});
        const post = await UserPosts.findOne({_id: postId});

        const like = await Likes.create({user, post});

        res.status(200).send(like);

    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
});

router.post('/like_post', authMiddleware, async(req,res)=>{
    try{
        const userId = req.user.id;
        const postId = req.body._id; 

        const user = await User.findOne({_id: userId});
        const post = await UserPosts.findOne({_id: postId});

        const { acknowledged } = await User.deleteOne({ user,post });

        if (!acknowledged) {
            res.status(400).send({ msg: "Cannot delete like" });
        }
        else {
            res.status(202).send({ msg: "deleted complete" });
        }

        res.status(200).send(like);

    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
});

module.exports = router;
