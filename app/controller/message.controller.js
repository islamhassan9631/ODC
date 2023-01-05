const { model } = require("mongoose")
const messageModel = require("../../db/models/message.model")
const Myhelper=require("../helper")
class Message{
  ////add message
  static addMessage=async(req,res)=>{
    try{
        const { msg } = req.body
        
        const message = new messageModel({
            senderId:req.user._id,
           msg:msg
            
        })
        await message.save()
        Myhelper.reshandlar(res, 200, true, message, "added")

    }
    catch(e){
        Myhelper.reshandlar(res, 500, false, e, e.message)

    }
}
/////////
 ///////
    // get message a user
    static getmessage = async(req,res)=>{
        
        try{
            const message =await messageModel.find({
                conversationId: req.params.conversationId }).populate({
                    path:"conversation",
                    model:"conversions",
                    populate:{
                        path:"menbers",
                        model:"user",
                        select:"fName lName "
                    }
                    
                })  
            
            Myhelper.reshandlar(res, 200, true,message , "done")
            }catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
}
}

module.exports = Message