const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
menbers:{
    type:Array,
},
},{timestamps: true}
)
module.exports = mongoose.model('Conversation',conversationSchema);