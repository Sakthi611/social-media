
const mongoose=require('mongoose');

const User=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    }
});

module.exports=mongoose.model('User',User);