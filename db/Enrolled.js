const moogooes= require("mongoose");

const EnrollSchema= moogooes.Schema({
    username:{
        type:String,
        // required:true
    },
    phone:{
        type:Number,
        // required:true
    },
    email:{
        type:String,
        // require:true,
        lowercase: true,
    },
    course: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    }
});

module.exports= moogooes.model('enrolleds',EnrollSchema);