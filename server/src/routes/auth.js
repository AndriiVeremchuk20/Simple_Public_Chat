const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/helpers');
const User = require('../database/schemas/User');
const Roles = require('../database/schemas/Roles');
const UserPosts = require('../database/schemas/UserPost');
const Likes = require('../database/schemas/Likes');
const Subsctiptions = require('../database/schemas/Subscribe');
const { secret } = require('../config');
const authMiddleware = require('../middleware/authMiddleware');
//const roleMiddleware = require('../middleware/roleMiddleware');
const router = Router();

const generateAccessToken = (id, roles) => {
    const payload = {
        id: id,
        roles: roles,
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
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

        else if (await comparePassword(password, user.password)) {
            console.log(user);
            const token = generateAccessToken(user._id, user.roles)
            res.status(201).send({
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAT: user.createdAT,
                    avatarUrl: user.avatarUrl,
                }
            });
        }
        else res.status(400).send({ msg: "Invalid password" });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Login server error" });
    }
});

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id });

        const token = generateAccessToken(user._id, user.roles);
        res.status(201).send({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                createdAT: user.createdAT,
                avatarUrl: user.avatarUrl,
            }
        })

    } catch (e) {
        console.error(e);
        res.status(403).send({ msg: "Server error" });
    }
});

// delete all user data (likes, posts)//
router.delete('/user', authMiddleware, async (req, res) => {
    try {
        const { id, roles } = req.user;
        console.warn("Delete user", req.user);

        if (roles.some((role) => role === "ADMIN")) {
            console.log("Cannot delete ADMIN account");
            return res.status(400).send({ msg: "Cannot delete ADMIN account" });
        }

        const { acknowledged } = await User.deleteOne({ _id: id })

        if (!acknowledged) {
            return res.status(400).send({ msg: "Cannot delete account" });
        }

        res.status(202).send({ msg: "deleted complete" });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" })
    }
})

router.get('/search', authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const { username } = req.query;
        const users = await User.find(
            {
                username: {
                    "$regex": username,
                    '$options': 'i',
                },
            }).select('username avatarUrl email roles');

        const usersWithoudAdmin = users.filter((user) => !user.roles.some((role) => role === "ADMIN"));
        res.status(200).send(usersWithoudAdmin);
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

router.get("/user/:id", authMiddleware, async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).select('username avatarUrl email createdAt');

        if (!user) {
            return res.status(404).send({ msg: "Not found" })
        }

        let userPosts = await UserPosts.find({ postedBy: user }).sort({ createdAt: -1 });
        userPosts = userPosts.map((post) => { post.postedBy = user; return post });

        const likes = await Likes.find({});

        const subscriptions = await Subsctiptions.find({ subscribed: id });
        const subscribers = await Subsctiptions.find({ to: id });

        res.status(200).send({
            user: user,
            posts: userPosts,
            subscriptions: subscriptions,
            subscribers: subscribers,
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" })
    }
});

module.exports = router;
