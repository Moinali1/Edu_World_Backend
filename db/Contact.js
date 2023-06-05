const mongoose= require("mongoose");

const contactSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        require:true,
        lowercase: true,
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
    },
    pin: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    query: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('contactDetails',contactSchema);