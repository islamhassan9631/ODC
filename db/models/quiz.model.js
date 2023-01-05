const mongoose = require('mongoose');
const quizSchema =new mongoose.Schema({
    levels: {
        type: String,
        enum: ['beginner', 'advanced', 'professionl'],
       required: true
      },
      question:{
        type: Array,
        default:[]
      },
      answers:{
        type: Array,
        default:[]
      },
},{timestamps: true})

const Quiz=mongoose.model("Quiz",quizSchema)
module.exports=Quiz