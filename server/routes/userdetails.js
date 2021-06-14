const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Posts = require('../models/posts')
const router = express.Router()

router.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .select("-password")
    .then(result=>{
        if(!result){
            return res.status(422).json({msg:"No Such User exists"})
        }
        else{
            // return res.status(200).json(result)
            Posts.find({postedby:req.params.id}).then(posts=>{
                return res.status(200).json({user:result,posts})
            })
        }
    })
    .catch(error=>{
        res.status(422).json({error})
    })
})

module.exports = router;