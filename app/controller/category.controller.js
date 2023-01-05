const categoryModel = require("../../db/models/category.models")
const Myhelper=require("../helper")
class Category {

static  CreateCategory=async (req,res)=>{
    try {

        const category = new categoryModel(req.body)
      

        await category.save()
        return Myhelper.reshandlar(res,200,true,category,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
////////

static allCategories=async (req,res)=>{
   
        try{
            const categories=await categoriesModel.find({})
            return Myhelper.reshandlar(res,200,true,categories,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,e,e.message)
    }
    
    }
  
static categoryId=async (req,res)=>{
   
        try{
            const category=await categoryModel.findById(req.params.id)
            if(!category){return res.status(404).send("category not found")}
            return Myhelper.reshandlar(res,200,true,category,"done")
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
  
static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const category=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(category[el]=req.body[el]))
        await category.save()
        
        if(!category){return res.status(404).send("category not found")}
        return Myhelper.reshandlar(res,200,true,category,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

static delete=async(req,res)=>{
    try{
        const category=await categoryModel.findByIdAndDelete(req.params.id)
        if(!category){return res.status(404).send("category not found")}
        return Myhelper.reshandlar(res,200,true,category,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
}


module.exports = Category