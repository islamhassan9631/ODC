const userModel = require("../../db/models/user.model")
const Myhelper=require("../helper")


const fs = require("fs")
class User{
  
  
    static profile= async(req,res)=>{
          try{
            Myhelper.reshandlar(
                res,200,true,req.user
            )
          }catch(e){
  Myhelper.reshandlar( res,500,false)
          }
           
        
         
        
    }
    static users= async(req,res)=>{
        try{
            const users=await userModel.find({})
            return Myhelper.reshandlar(res,200,true,users,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,e,e.message)
    }

}


static userId=async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.id)
        if(!user){return res.status(404).send("User not found")}
        return Myhelper.reshandlar(res,200,true,user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const user=await userModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(user[el]=req.body[el]))
        await user.save()
        
        if(!user){return res.status(404).send("User not found")}
        return Myhelper.reshandlar(res,200,true,user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static delete=async(req,res)=>{
    try{
        const user=await userModel.findByIdAndDelete(req.params.id)
        if(!user){return res.status(404).send("User not found")}
        return Myhelper.reshandlar(res,200,true,user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static logout= async(req,res)=>{
    try{
 req.user.tokens=req.user.tokens.filter((el)=>{
    return el.token!= req.token
}) 

await req.user.save()
return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

static unactv= async(req,res)=>{
    try{
        req.user.status=!req.user.status

await req.user.save()
return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static actv= async(req,res)=>{
    try{
        req.user.status=!req.user.status


await req.user.save()
return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static address= async(req,res)=>{
    try{
        req.user.addresses=req.body
await req.user.save()
return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static logoutAll= async(req,res)=>{
    try{
 req.user.tokens=[]
 await req.user.save()



return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}

}
static addresses= async(req,res)=>{
    try{
 req.user.addresses=req.user.addresses.filter((el)=>{
    return el.addresses= req.user.addresses
}) 

await req.user.save()
return Myhelper.reshandlar(res,200,true,req.user.addresses,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}


static addaddresse= async(req,res)=>{
    try{
 
 req.user.addresses.push(req.body)

await req.user.save()
return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static addressesId=async(req,res)=>{
    try{  
      
     const address=req.user.addresses.find(address=>address.id==req.params.id
            )
        if(!address){return res.status(404).send("User not have any address")}
        return Myhelper.reshandlar(res,200,true,address,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static deleteAddresse=async(req,res)=>{
    try{
        req.user.addresses=req.user.addresses.filter(adress=>adress.id!= req.params.id);
        req.user.save();
        return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

static profileimg=async(req,res)=>{
    try{
       
    const est=req.file.originalname.split(".").pop()
    const newn=`uploads/user/`+ Date.now() +est

    fs.renameSync(req.file.path,newn)
    req.user.image=newn
        
    await req.user.save()
    return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
/////////////
static postResult= async(req,res)=>{
    try{
 
 req.user.Result.push(req.body)

await req.user.save()
return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

}


module.exports = User