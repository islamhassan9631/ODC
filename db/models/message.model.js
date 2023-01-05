const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
conversationId:{
    type:mongoose.Schema.Types.ObjectId, ref: 'conversationId'
},
senderId:{
    type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
},
text:{
    type:String,
   
   
}
},{timestamps: true}
)
module.exports = mongoose.model('Message',MessageSchema);