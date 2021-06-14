const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../keys');
const verifyuser = require('../middlewares/verifytoken');
const router = express.Router();


router.post('/',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"provide both email and password"});
    }
    else{
        User.findOne({email:email}).then(savedUser=>{
            // console.log(savedUser);
            if(!savedUser){
                return res.status(422).json({error:"invalid password or gmail"});
            }
            else{
                bcrypt.compare(password,savedUser.password,(err,is_valid)=>{
                    // console.log(is_valid);
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(is_valid){
                            const token = jwt.sign({_id:savedUser._id},JWT_KEY);
                            const{_id,email,name} = savedUser;
                            return res.status(200).json({token:token,user:{_id,email,name}});
                        }
                        else{
                            return res.status(422).json({error:"invalid password or gmail"});
                        }
                    }
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    }
});

module.exports = router;