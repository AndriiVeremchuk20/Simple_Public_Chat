const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.autorization;
            if (!token) {
                return res.status(403).send({ msg: "User is not authorize" });
            }

            const { roles: userRoles } = jwt.verify(token, secret);
            let hasRole = false
            
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({ msg: "You don't have access" })
            }
            next();

        } catch (e) {
            console.error(e);
            return res.status(500).send({ msg: "Server error" });
        }
    }
}
