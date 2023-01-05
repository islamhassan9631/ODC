const convModel = require("../../db/models/conversation.model")
const Myhelper=require("../helper")
class Conver{
    ////// create conversation
    static creatConver = async(req,res)=>{
        try{
              const senderId=req.user._id
            const converstion = new convModel({
              
                menbers:[req.body.senderId,req.body.receiverId]
                
                
            })
            await converstion.save()
            Myhelper.reshandlar(res, 200, true, converstion, "add")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
    ///////
    // get converstion a user
    static getConverstion = async(req,res)=>{
        
        try{
            const converstion =await convModel.find({
                menbers:{$in:[req.params.userId]}
            })
                
            
            Myhelper.reshandlar(res, 200, true,converstion , "done")
            }catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
}
}
module.exports = Conver