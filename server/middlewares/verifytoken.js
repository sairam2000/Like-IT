const { JWT_KEY } = require('../keys');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    // console.log(req.headers);
    const { authorization } = req.headers;
    // console.log(000);
    if (!authorization) {
        return res.status(401).json({ error: "token is required" });
    }
    const token = authorization.replace("Bearer ", "");
    // console.log(token);
    jwt.verify(token, JWT_KEY, (err, payload) => {
        // console.log(payload);
        if (err) {
            return res.status(401).json({ error: "invalid token" });
        }
        const { _id } = payload;
        User.findById(_id, (err, user) => {
            if (err) {
                return res.status(401).json({ error: "invalid token" });
            }
            req.user = user;
            // console.log(user);
            next();
        })
    });

}