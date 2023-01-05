const commentModel = require("../../db/models/comment.model")
const Myhelper=require("../helper")
class Comment{
    static addcomment = async(req,res)=>{
        try{
            const newComment=req.body
            const comment = new commentModel({
                userId: req.user._id,
                postId: req.body.postId,
                newComment
            })
            await comment.save()
            Myhelper.reshandlar(res, 200, true, comment, "done")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
   
    static Allcomment=( async (req, res) => {
        
        try {
           let comments = await commentModel.find()
        
            Myhelper.reshandlar(res, 200, true, {
                comments
            }, "done")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    static comment=( async (req, res) => {
        const _id = req.params.id
        try {
            const comment = await commentModel.findOne({ _id, userId: req.user._id })
           
           
                if(!comment) throw new Error("not found")
            
            Myhelper.reshandlar(res, 200, true, {
                comment,
              
            }, "done")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    
    
    static edit=( async (req, res) => {
        try {
            const _id = req.params.id
            const comment = await commentModel.findOneAndUpdate({_id,userId: req.user._id },req.body, {
        
                new: true,
                runValidators: true
            })
    
            
             
                Myhelper.reshandlar(res, 200, true, {
                    comment
                    
                }, "done")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static delete =( async (req, res) => {
        try {
            const comment = await commentModel.findByIdAndDelete(req.params.id)
           
             
                Myhelper.reshandlar(res, 200, true, 
              
                    
                 "delete")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static deleteAll =( async (req, res) => {
        try {
           await commentModel.deleteMany()
        
          
              
                Myhelper.reshandlar(res, 200, true, {
          
                    
                }, "deleteAll")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
}
module.exports = Comment