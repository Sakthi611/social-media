
const mongoose=require("mongoose");

const StorySchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },

    user:{
        id:{
            type:Number,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        profile_pic:{
            type:String,
            required:true,
            default:"assets/defaultImage.jpeg"
        }
    },
    image:{
        type:String,
        required:true,
        
    },
    caption:{
        type:String
    }
},
{timestamps:true}
)

module.exports=mongoose.model('Story',StorySchema);