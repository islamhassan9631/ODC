const prodcutModel = require("../../db/models/prodcut.models")
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const Myhelper=require("../helper")
class prodcut {

    static prodcutimg=async(req,res,next)=>{
        try{
            if (req.files.images) {
                req.body.images = [];
               
                await Promise.all(
                  
                  req.files.images.map(async (img, index) => {
                    const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                    await sharp(img.buffer)
                    .resize(2000, 1333)
                    .toFormat('jpeg')
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/products/${imageName}`)
                    
                    req.body.images.push(imageName);
                  })
                );
            
                next();
              }
       
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
    static addprodcut =async (req,res)=>{
        try {

            const prodcut = new prodcutModel({
                owner: req.user._id,
                ...req.body
            })
          
    
            await prodcut.save()
            return Myhelper.reshandlar(res,200,true,prodcut,"done")
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
 ///////////////
 static myProdcuts = async(req,res)=>{
    try{ 
        
        await req.user.populate("myProdcuts")
        Myhelper.reshandlar(res, 200, true, {
            myProdcuts: req.user.myProdcuts,
            user: req.user
        }, "done")
}
    catch(e){
        Myhelper.reshandlar(res, 500, false, e, e.message)

    }

}
static products= async(req,res)=>{
    try{
        const products=await prodcutModel.find({})
        return Myhelper.reshandlar(res,200,true,products,"done")
}catch(e){
    return Myhelper.reshandlar(res,500,false,e,e.message)
}

}



static productId=async(req,res)=>{
    try{
        const product=await prodcutModel.findById(req.params.id)
        if(!product){return res.status(404).send("product not found")}
        return Myhelper.reshandlar(res,200,true,product,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
////////

static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const product=await prodcutModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(product[el]=req.body[el]))
        await product.save()
        
        if(!product){return res.status(404).send("product not found")}
        return Myhelper.reshandlar(res,200,true,product,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static delete=async(req,res)=>{
    try{
        const product=await prodcutModel.findByIdAndDelete(req.params.id)
        if(!product){return res.status(404).send("product not found")}
        return Myhelper.reshandlar(res,200,true,product,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
   /////////////////// 
}
module.exports =prodcut