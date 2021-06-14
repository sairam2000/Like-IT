const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    body:{
        type: String,
        required : true
    },
    photo:{
        type: String,
        required:true
    },
    postedby : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    comments:[{
        text:String,
        postedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }]
});

module.exports = mongoose.model("Post",postSchema);