const mongoose=require("mongoose");

const AV_ContactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    messageType:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('algovizzcontact',AV_ContactSchema);