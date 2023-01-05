const mongoose = require("mongoose")
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const geocoder = require('../../app/utils/geocoder');
const Userschema = mongoose.Schema( {
    fName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength:20,
        required:true
    }, 
    lName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength:20,
        required:true
    }, 
    age:{
        type:Number,
       
    }, 
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
    status:{
        type:Boolean,
        default: false
    }, 
    image:{
        type:String, 
        trim:true
    }, 
    password:{
        type:String, 
        trim:true,
        minLength: 5,
        required:true,
        // match: ''
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ['user', 'partner', 'admin'],
        default: 'user',
      }, 
      levels: {
        type: String,
        enum: ['beginner', 'advanced', 'professionl'],
        default: 'beginner',
      }, 
    gender:{
        type:String, 
        trim:true,
        lowercase:true,
        enum: ["male", "female"]
    }, 
    dOfBirth:{
        type: Date
    }, 
    phoneNum:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
        }
    },
    addresses: [
        {
            addressType:{
                type:String, 
                trim:true,
                 required:true
            },
            details:{}
        }
    ],
    ////////
    ///after user finish quiz ..front end  calculations the result and send data 
    Result:[
{result:{
    trpe:Array,
    default:[]
},
points:{
    type:Number,
    default:0
},
achived:{
    type:String,
    default:""
}

}
    ],
    ////////////////////
    
    ///front end he can handle this if user  chose partner --> take this data 
    storeName: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
       
      },
      storAddress: {
        type: String,
        // required: true
      },
      location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
      //////////////////
   

         tokens:[
            {token:{type:String,
                }
                }
         ],
         
},{timestamps:true} )
   
Userschema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,8)
    }
   

    
})
Userschema.statics.login=async(email,password)=>{
    const  user=await User.findOne({email})
    if(!user) throw new Error("error")
    const vilpas=await bcryptjs.compare(password,user.password)
    if(!vilpas) throw new Error("error")
    return user
}
Userschema.virtual("myPosts", {
    ref:"Post",
    localField:"_id",
    foreignField:"userId"
})
Userschema.virtual("mysProdcuts", {
    ref:"Prodcut",
    localField:"_id",
    foreignField:"userId"
})
Userschema.methods.toJSON=function(){
    const data=this.toObject()
    delete data.password
    delete data.tokens
    return data
}
Userschema.methods.genratToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id},"node")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}


const User=mongoose.model("User",Userschema)
module.exports=User