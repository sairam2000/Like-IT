const mongoose = require("mongoose");
const Post = require('../models/posts');
const express = require('express');
const verifytoken = require('../middlewares/verifytoken');
const user = require("../models/user");
const posts = require("../models/posts");

const router = express.Router()

router.post('/create',verifytoken,(req,res)=>{
    const {title,body,photo} = req.body;
    if(!title || !body || !photo){
        return res.status(422).json({error:"need to specify body and title "});
    }
    req.user.password = undefined;
    const post = Post({
        title:title,
        body:body,
        photo:photo,
        postedby:req.user
    });
    post.save().then(savedpost=>{
        return res.status(200).json({msg:'post saved successfully',
                                        post:post})
    }).catch(err=>{
        console.log(err);
    })
    
})

router.get('/all',verifytoken,(req,res)=>{
    Post.find().populate("postedby","_id name")
    .populate("comments.postedby","_id name")
    .then(posts=>{
        res.json({posts});
    }).catch(err=>{
        console.log(err);
    })
});

router.get('/myposts',verifytoken,(req,res)=>{
    Post.find({postedby: req.user._id})
    .populate("comments.postedby","_id name")
    .populate("postedby","_id name").then(posts=>{
        res.json({posts});
    }).catch(err=>{
        console.log(err);
    })
});

router.put('/like',verifytoken,(req,res)=>{
    posts.findByIdAndUpdate(req.body.postid,{
        $push:{likes:req.user._id}},{
            new:true
        }
    )
    .populate("comments.postedby","_id name")
    .populate("postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
});

router.put('/unlike',verifytoken,(req,res)=>{
    posts.findByIdAndUpdate(req.body.postid,{
        $pull:{likes:req.user._id}},{
            new:true
        }
    )
    .populate("comments.postedby","_id name")
    .populate("postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
});

router.put('/comment',verifytoken,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedby:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postid,{
        $push:{comments:comment}},{
            new:true
        })
        .populate("comments.postedby","_id name")
        .populate("postedby","_id name")
        .exec((err,result)=>{
            if(err){
                res.status(422).json({error:err})
            }
            else{
                res.status(200).json(result)
            }
        })
})


router.delete('/delete/:postid',verifytoken,(req,res)=>{
    Post.findOne({_id:req.params.postid})
    .populate('postedby','_id')
    .exec(
        (err,post)=>{
            if(err || !post){
                return res.status(422).json({error:"something went wrong"})
            }
            if(post.postedby._id.toString() === req.user._id.toString()){
                post.remove()
                .then(result=>{
                    return res.status(200).json(result)
                })
                .catch(err=>console.log(err));
            }
        }
    )
})

module.exports = router;
