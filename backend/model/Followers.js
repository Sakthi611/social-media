
const  mongoose =require("mongoose");

const FollowerSchema=mongoose.Schema({
    
    username:{
        type:String,
        required:true,
    },
    profile_pic:{
        type:String,
        default:"assets/defaultImage.jpeg",
    }
})

module.exports=mongoose.model('Follower',FollowerSchema);