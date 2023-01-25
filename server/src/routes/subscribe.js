const { Router } = require('express');
const Subsctiptions = require('../database/schemas/Subscribe');
const authMiddleware = require('../middleware/authMiddleware');
const Users = require('../database/schemas/User');

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const subscribed = req.user.id;
        const { to } = req.body;

        if (subscribed === to) {
            return res.status(400).send({ msg: "User cannot follow himself" });
        }

        const check = await Subsctiptions.findOne({ subscribed: subscribed, to: to });

        if (check) {
            return res.status(400).send({ msg: "user cannot subscribe twice" });
        }

        const newSubscribe = await Subsctiptions.create({ subscribed, to });

        res.status(200).send(newSubscribe);

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" })
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const followerId = req.params.id;

        console.log(id, followerId);

        const deletedSubscriptionID = await Subsctiptions.findOne({ $and: [{ subscribed: id }, { to: followerId }] }).select("_id");
        const deletedSubscription = await Subsctiptions.deleteOne({ $and: [{ subscribed: id }, { to: followerId }] });

        if (deletedSubscription.acknowledged && deletedSubscription.deletedCount > 0) {
            return res.status(202).send({ msg: "Unsubscribe complete", id: deletedSubscriptionID._id });
        }

        res.status(300).send({ msg: "Cannt unsubscribe" });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" })
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try{
        const { id } = req.params;

        const subscriptions = await Subsctiptions.find({ subscribed: id });
        const followers = await Subsctiptions.find({ to: id });
    
        const subscriptionsUsers = await Promise.all(subscriptions.map(async (subscription) =>
            await Users.findOne({ _id: subscription.to }).select('username avatarUrl email createdAt')));
    
        const followersUsers = await Promise.all(followers.map(async (follow) =>
            await Users.findOne({ _id: follow.subscribed }).select('username avatarUrl email createdAt')));
    
        res.status(200).send({ subscriptionsUsers: subscriptionsUsers, subscribersUsers: followersUsers});
   
    }catch(e){
        console.log(e);
        res.status(500).send({msg: "Server error"});
    }
})

module.exports = router;
