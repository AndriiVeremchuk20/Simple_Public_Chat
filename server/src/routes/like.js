const { Router } = require('express');
const Likes = require('../database/schemas/Likes');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', authMiddleware, async(req, res) => {
  try{

    const likes = await Likes.find({});
    res.status(202).send(likes);

  }catch(e){
    console.log(e);
    res.status(500).send({msg: "server error"});
  }
    
}) 

router.post('/', authMiddleware, async (req, res) => {
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

router.delete('/:postId', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        console.log(userId, postId)

        const deletedLike = await Likes.findOne({ $and: [{ user: userId }, { post: postId }] });

        const { acknowledged } = await Likes.deleteOne({ $and: [{ user: userId }, { post: postId }] });

        if (!acknowledged) {
            return res.status(400).send({msg: "cannot delete like"});
        }

        res.status(202).send(deletedLike);

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

module.exports = router;
