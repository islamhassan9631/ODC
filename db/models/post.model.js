const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema( {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
         required: true,
        ref:"User"
    },
    
    images: [String],
   
    content:{
        type:String,
        
    },
     
})
module.exports = mongoose.model('Post',PostSchema);