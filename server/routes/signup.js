const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "Require all Fields"
        })
    }
    else {
        bcrypt.hash(password,10, (err, hashedpassword) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(hashedpassword);
                const user = new User({
                    email: email,
                    name: name,
                    password: hashedpassword
                });
                User.findOne({ email: email }).then((savedUser) => {
                    if (savedUser) {
                        return res.status(422).json({ error: "Already user exists" });
                    }
                    else {
                        user.save().then((savedUser) => {
                            return res.status(200).json({ msg: "signup successful"});
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }

});

module.exports = router;