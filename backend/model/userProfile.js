
const mongoose =require("mongoose");

const userProfileSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        profilePicture:{
            type:String,
            default:"assets/defaultImage.jpeg",
            
            
        },

    }
,{timestamps:true}
)

module.exports=mongoose.model('userProfile',userProfileSchema);
