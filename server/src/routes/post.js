const { Router } = require('express');
const Users = require('../database/schemas/User');
const Posts = require('../database/schemas/UserPost');
const Likes = require('../database/schemas/Likes');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../database/schemas/User');

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        let posts = await Posts.find({}).sort({ createdAt: -1 });

        posts = await Promise.all(posts.map(async (post) => {
            const user = await Users.findOne({ _id: post.postedBy }).select('username avatarUrl email createdAt');
            post.postedBy = user;
            return post;
        }));

        const likes = await Likes.find({});

        res.status(200).send({ posts, likes });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
})

router.post('/post', authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const { text } = req.body;

        if (!text) {
            return res.status(400).send({ msg: "Empty post text" });
        }

        const post = await Posts.create({ postedBy: id, text: text });
        const user = await Users.findOne({ _id: id }).select('username avatarUrl email createdAt');

        post.postedBy = user;

        res.status(200).send(post);

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

router.delete('/post/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;

        const deletedLikes = await Likes.deleteMany({ post: postId });
        const deletedPost = await Posts.deleteOne({ $and: [{ _id: postId }, { postedBy: userId }] });
        
        if(deletedLikes.acknowledged&&deletedLikes.acknowledged){
          return res.status(202).send({msg: "Deleted complete", post: postId});
        }

        res.status(400).send({msg: "cannot delete post"});


    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
})

router.get('/likes', authMiddleware, async (req, res) => {
    try {
        const likes = await Likes.find({});
        res.status(200).send(likes);
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
})

router.post('/likePost', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.body.postId;

        const like = await Likes.findOne({ $and: [{ user: userId }, { post: postId }] });

        if (!like) {
            const newLike = await Likes.create({ user: userId, post: postId });
            return res.status(200).send({ like: newLike });
        }

        res.status(400).send({ msg: "Like already delivered" });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

router.delete('/likePost/:postId', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        console.log(userId, postId)

        const { acknowledged } = await Likes.deleteOne({ $and: [{ user: userId }, { post: postId }] });

        if (!acknowledged) {
            return res.status(400).send({ msg: "Cannot delete like" });
        }

        res.status(202).send({ msg: "deleted complete" });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

module.exports = router;
