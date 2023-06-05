const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name:String,
    email: {
        type : String,
        lowercase: true,
    },
    password:String
});

module.exports = mongoose.model('users',userSchema);