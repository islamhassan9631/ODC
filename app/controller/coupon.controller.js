const { models, model } = require("mongoose")
const couponModel = require("../../db/models/coupon.model")
const Myhelper=require("../helper")
class Coupon {
// @desc    Create coupon
// @route   POST  /api/v1/coupons
// @access  Private/Admin-Manager
static CreateCoupon=async (req,res)=>{
    try {

        const coupon = new couponModel(req.body)
      

        await coupon.save()
        return Myhelper.reshandlar(res,200,true,coupon,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

static allCoupon=async (req,res)=>{
   
    try{
        const coupon=await couponModel.find({})
        return Myhelper.reshandlar(res,200,true,coupon,"done")
}catch(e){
    return Myhelper.reshandlar(res,500,false,e,e.message)
}

}
///////

static couponId=async (req,res)=>{
   
    try{
        const coupon=await couponModel.findById(req.params.id)
        if(!coupon){return res.status(404).send("coupon not found")}
        return Myhelper.reshandlar(res,200,true,coupon,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
/////////////

static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const coupon=await couponModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(coupon[el]=req.body[el]))
        await coupon.save()
        
        if(!coupon){return res.status(404).send("coupon not found")}
        return Myhelper.reshandlar(res,200,true,coupon,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

static delete=async(req,res)=>{
    try{
        const coupon=await couponModel.findByIdAndDelete(req.params.id)
        if(!coupon){return res.status(404).send("coupon not found")}
        return Myhelper.reshandlar(res,200,true,coupon,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
}
module.exports=Coupon