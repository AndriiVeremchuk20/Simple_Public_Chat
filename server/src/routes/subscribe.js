const { Router } = require('express');
const Subscribers = require('../database/schemas/Subscribe');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const subscribed = req.user.id;
        const { to } = req.body;

        if (subscribed === to) {
            return res.status(400).send({ msg: "User cannot follow himself" });
        }

        const check = await Subscribers.findOne({ subscribed: subscribed, to: to });

        if (check) {
            return res.status(400).send({ msg: "user cannot subscribe twice" });
        }

        const newSubscribe = await Subscribers.create({ subscribed, to });

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

        const deletedSubscriptionID = await Subscribers.findOne({ $and: [{ subscribed: id }, { to: followerId }] }).select("_id");
        const deletedSubscription = await Subscribers.deleteOne({ $and: [{ subscribed: id }, { to: followerId }] });

        if (deletedSubscription.acknowledged && deletedSubscription.deletedCount > 0) {
            return res.status(202).send({ msg: "Unsubscribe complete", id: deletedSubscriptionID});
        }

        res.status(300).send({ msg: "Cannt unsubscribe"});

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error" })
    }
});

module.exports = router;
