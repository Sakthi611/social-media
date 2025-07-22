
const  mongoose =require("mongoose");

const FollowerSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    profile_pic:{
        type:String,
        default:"",
    }
})

module.exports=mongoose.model('Follower',FollowerSchema);