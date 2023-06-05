const mongoose = require("mongoose");

const CourseDetails= new mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        require:true
    },
    instructor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports= mongoose.model('courses',CourseDetails);