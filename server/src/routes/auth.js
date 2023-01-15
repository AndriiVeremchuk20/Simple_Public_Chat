const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/helpers');
const User = require('../database/schemas/User');
const Roles = require('../database/schemas/Roles');
const { secret } = require('../config');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = Router();

const generateAccessTocken = (id, roles) => {
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
            const token = generateAccessTocken(user._id, user.roles)
            res.status(201).send({
                token,
                user: {
                    id: user._id,
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

        const token = generateAccessTocken(user._id, user.roles);
        res.status(201).send({
            token,
            user: {
                id: user._id,
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
})

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
            res.status(400).send({ msg: "Cannot delete account" });
        }
        else {
            res.status(202).send({ msg: "deleted complete" });
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" })
    }
})

router.get('/search', authMiddleware, async (req, res) => {
    try {
        const { username } = req.query;
        const users = await User.find(
            {
                username: {
                    "$regex": username,
                    '$options': 'i',
                }
            }).select('username avatarUrl email');

        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" });
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = User.findOne({ _id: id }).select('username avatarUrl email createdAt');
    
        if (!user) {
            res.status(404).send({ msg: "Not found" })
        }
        
        res.status(302).send(user);
        
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Server error" })
    }
});

module.exports = router;
