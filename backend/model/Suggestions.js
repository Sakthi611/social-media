

const mongoose =require("mongoose");

const Suggestions=mongoose.Schema({

    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"assets/defaultImage.jpeg",
        requied:true
    }
    

})

module.exports=mongoose.model('Suggestions',Suggestions);