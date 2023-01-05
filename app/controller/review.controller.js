const reviewModel = require("../../db/models/review.model")
const Myhelper=require("../helper")
class Review{

static createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId };
    req.filterObj = filterObject;
    next();
  };
  
static allreviews= async(req,res)=>{
    try{
        const reviews=await reviewModel.find({})
        return Myhelper.reshandlar(res,200,true,reviews,"done")
}catch(e){
    return Myhelper.reshandlar(res,500,false,e,e.message)
}
}
////////////
static reviewId=async(req,res)=>{
    try{
        const review=await reviewModel.findById(req.params.id)
        if(!review){return res.status(404).send("review not found")}
        return Myhelper.reshandlar(res,200,true,review,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
///////////////
// Nested route (Create)
static setProductIdAndUserIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
  };
  ///////////////
  // @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/Protect/User
static createReview =async(req,res)=>{
    try{
        const review = new reviewModel(req.body)
          
    
        await review.save()
        return Myhelper.reshandlar(res,200,true,review,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
///////////////

static updateReview =async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const review=await reviewModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(review[el]=req.body[el]))
        await review.save()
        
        if(!review){return res.status(404).send("review not found")}
        return Myhelper.reshandlar(res,200,true,review,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static delete=async(req,res)=>{
    try{
        const review=await reviewModel.findByIdAndDelete(req.params.id)
        if(!review){return res.status(404).send("review not found")}
        return Myhelper.reshandlar(res,200,true,review,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
}
module.exports = Review