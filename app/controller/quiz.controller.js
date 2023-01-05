const quizModel = require("../../db/models/prodcut.models")
const Myhelper=require("../helper")
class Quiz {
    static addQuzi =async (req,res)=>{
        try {

            const Quiz = new quizModel(req.body)
          
    
            await Quiz.save()
            return Myhelper.reshandlar(res,200,true,Quiz,"done")
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
    /////////
    static Quizs= async(req,res)=>{
        try{
            const Quizs=await quizModel.find({})
            return Myhelper.reshandlar(res,200,true,Quizs,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,e,e.message)
    }
    
    }
    /////////////
    static QuizId=async(req,res)=>{
        try{
            const Quiz=await quizModel.findById(req.params.id)
            if(!Quiz){return res.status(404).send("Quiz not found")}
            return Myhelper.reshandlar(res,200,true,Quiz,"done")
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
    ////////////
    static update=async(req,res)=>{
        const update=Object.keys(req.body)
        try{
            const Quiz=await quizModel.findByIdAndUpdate(req.params.id,req.body,{
                new :true,
                runValidators:true
            })
            update.forEach((el)=>(Quiz[el]=req.body[el]))
            await Quiz.save()
            
            if(!Quiz){return res.status(404).send("Quiz not found")}
            return Myhelper.reshandlar(res,200,true,Quiz,"done")
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
    static delete=async(req,res)=>{
        try{
            const Quiz=await quizModel.findByIdAndDelete(req.params.id)
            if(!Quiz){return res.status(404).send("Quiz not found")}
            return Myhelper.reshandlar(res,200,true,Quiz,"done")
        }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
    }
       /////////////////// 
    }

module.exports =Quiz