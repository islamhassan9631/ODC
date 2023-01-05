const jwt=require("jsonwebtoken")
const User=require("../db/models/user.model")

  const auth=async(req,res,next)=>{
    try{
const token=req.header("Authorization").replace("Bearer ","")
const decode=jwt.verify(token,"node")
const user=await User.findOne({_id: decode._id,
    "tokens:token":token})
if(!user){
    throw new Error("User not found")
}

    req.user=user
    req.token=token
next()
    }
    catch(e){
  
    }
}

 
module.exports=auth