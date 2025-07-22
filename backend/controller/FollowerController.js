const Followers = require("../model/Followers");



const getFollower=async(req,res)=>{
    try{
        const followers=await Followers.find();
        if(!followers){
            return res.status(400).json({
                success:false,
                message:"No followers Found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Followers Found Successfully",
            followers:followers
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something Went wrong"
        })
    }
}

const getFollowerById=async(req,res)=>{
    try{
        const follower=await  Followers.findById(req.params.id);
        if(!follower){
            return res.status(400).json({
                success:false,
                message:"No follower found for this ID "
            })
        }
        res.status(200).json({
            success:true,
            message:"Follower Found SuccessFully",
            follower:follower
        })
    }
    catch(error){
        console.log(error);
    }
}

const createFollower=async(req,res)=>{
    try{
        const{id,username,profile_pic}=req.body;
        const newFollower=await Followers.create({
            id,
            username, profile_pic
        })
        const savedFollower=await newFollower.save();
        if(!savedFollower){
            return res.status(400).json({
                success:false,
                message:"Follower Not Created"
            });
        }
        res.status(200).json({
            success:true,
            message:"Follower Created Successfully",
            follower:savedFollower
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

const updateFollower=async(req,res)=>{
    try{
        const {id,username,profile_pic}=req.body;
        const updatedFollower=await Followers.findByIdAndUpdate({
            id,
            username,
            profile_pic
        },
    {
        new:true
    })

    if(!updatedFollower){
        return res.status(400).json({
            success:false,
            message:"Follower Not Updated .Enter the valid Fields"
        })
    }

    res.status(200).json({
        success:true,
        message:"Follower Updated Successfully",
        follower:updatedFollower
    })
    }

    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}


const removeFollower=async(req,res)=>{
    try{

        const deleteFollower=await Followers.findByIdAndDelete(req.params.id);
       if(!deleteFollower){
        return res.status(400).json({
            success:false,
            message:"Invalid Id Entered",
        })
       } 

       res.status(200).json({
        success:true,
        message:"Follower Deleted Successfully"
       })
    }

    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}


const removeAllFollowers=async(req,res)=>{
    try{
        const deleteAll=await Followers.deleteMany();
        if(deleteAll.count===0){
            return res.status(200).json({
                success:true,
                message:"No Follower found to Delete"
            })
        }
        res.status(200).json({
            success:true,
            message:"All Followers Deleted Successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Sometning Went Wrong"
        })
    }
}



module.exports={
    getFollower,
    getFollowerById,
    createFollower,
    updateFollower,
    removeFollower,
    removeAllFollowers
}