const postModel = require("../../db/models/post.model")
const Myhelper=require("../helper")
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
class Post{
    static postimg=async(req,res,next)=>{
        try{
            if (req.files.images) {
                req.body.images = [];
               
                await Promise.all(
                  
                  req.files.images.map(async (img, index) => {
                    const imageName = `post-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                    await sharp(img.buffer)
                    .resize(2000, 1333)
                    .toFormat('jpeg')
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/posts/${imageName}`)
                    
                    req.body.images.push(imageName);
                  })
                );
            
                next();
              }
       
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
    static addPost = async(req,res)=>{
        try{
            const postData = new postModel({
                // userId: req.user._id,
                ...req.body
            })
            await postData.save()
            Myhelper.reshandlar(res, 200, true, postData, "added")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
    static myPosts = async(req,res)=>{
        try{ 
            // const posts = await postModel.find({userId: req.user._id})
            await req.user.populate("myPosts")
            Myhelper.reshandlar(res, 200, true, {
                posts: req.user.myPosts,
                user: req.user
            }, "done")
}
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    }
    static Allpost=( async (req, res) => {
        
        try {
           let posts = await postModel.find()
           posts=posts.map(el=>{
            el.userId.toString()===req.user._id.toString()?
            el={...el._doc,isMine:true}:
            el={...el._doc,isMine:false}
            return el
           })
             
            
            Myhelper.reshandlar(res, 200, true, {
                posts
            }, "done")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    static post=( async (req, res) => {
        const _id = req.params.id
        try {
            const post = await postModel.findOne({ _id, userId: req.user._id })
           
           
                if(!post) throw new Error("not found")
            
            Myhelper.reshandlar(res, 200, true, {
                post,
              
            }, "added")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    
    
    static edit=( async (req, res) => {
        try {
            const _id = req.params.id
            const post = await postModel.findOneAndUpdate({_id,userId: req.user._id },req.body, {
        
                new: true,
                runValidators: true
            })
    
            
             
                Myhelper.reshandlar(res, 200, true, {
                 post
                    
                }, "added")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static delete =( async (req, res) => {
        try {
            const post = await postModel.findByIdAndDelete(req.params.id)
           
             
                Myhelper.reshandlar(res, 200, true, 
              
                    
                 "delete")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static deleteAll =( async (req, res) => {
        try {
           await postModel.deleteMany()
        
          
              
                Myhelper.reshandlar(res, 200, true, {
          
                    
                }, "deleteAll")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    
    
    
    
}
module.exports = Post