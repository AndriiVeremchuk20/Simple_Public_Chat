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
        console.log(req.user);
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
        res.status(403).send({ msg: "Server Error" });
    }
})

//method to testing
router.get('/users', roleMiddleware(["ADMIN"]), async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        console.error(e);
        res.status(500).send({ msg: "Server error" })
    }
});

router.get("/user", roleMiddleware(["ADMIN"]), async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findOne({ _id: id });
        const roles = await Roles.find(user.roles);
        console.log(roles);
        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(500).send({ msg: "Server error" });
    }
})

module.exports = router;
