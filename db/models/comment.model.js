const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Post"
    },
    content:{
        type:String,
        required:true}
},
{ timestamps: true }
)






module.exports = mongoose.model('Comment', CommentSchema);