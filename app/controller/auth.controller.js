const userModel = require("../../db/models/user.model")
const Myhelper=require("../helper")
const crypto = require('crypto');


const sendEmail = require('../utils/sendEmail');
class Auth{
    static register= async(req,res)=>{
        try{
            const userData=new userModel(req.body)
            console.log(req.body);
            await userData.save()
            console.log(userData);
            const token=await userData.genratToken()
            return Myhelper.reshandlar(
                res,200,true,{userData:userData,token},"done"
            )
        }catch(e){
        return Myhelper.reshandlar( res,500,false,e,e.message)
    }
    }

    static login=async(req,res)=>{
        try{
            const user= await userModel.login(req.body.email,req.body.password)
           
            const token=await user.genratToken()
              await user.save()
            return Myhelper.reshandlar(
                res,200,true,{user:user,token},"done"
            )
        }catch(e){
        return Myhelper.reshandlar( res,500,false,e,e.message)
    }
    }

   //    Authorization (User Permissions)
// ["admin", "'partner'"]
static allowedTo = (...roles) =>(async (req, res, next) => {
try{
// 1) access roles
  // 2) access registered user (req.user.role)
  if (!roles.includes(req.user.role)) {
    throw new Error("User Permissions")
}
}catch(e){
return Myhelper.reshandlar( res,500,false,e,e.message)
}
next();
})
// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
static forgotPassword= async(req,res)=>{
   
        const user = await userModel.findOne({ email: req.body.email });
        if(!user){return res.status(404).send("User not found")}
       // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();
  const message = `Hi ${user.name},\n We received a request to reset the password on your laVie Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)',
      message,
    });
  } catch (e) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    
  }

  res
    .status(200)
    .send({ status: 'Success', message: 'Reset code sent to email' });
    }
    
static verifyResetCode= async(req,res)=>{
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode).Buffer()
    .digest('hex');

  const user = await userModel.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    {return res.status(404).send("User not found")}
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();
  return Myhelper.reshandlar(
    res,200,true,"done"
)
  
}

static resetPassword= async(req,res)=>{
    const user = await userModel.findOne({ email: req.body.email });
  if (!user) { {return res.status(404).send("There is no user with email")}}

  

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    {return res.status(404).send('Reset code not verified')}}
   
  

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token=await user.genratToken()
              await user.save()
            return Myhelper.reshandlar(
                res,200,true,{user:user,token},"done"
            )
 
}
/////////////

}
module.exports=Auth



   
  
