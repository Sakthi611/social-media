

const Posts=require('../model/Posts');


const getPosts=async(req,res)=>{
    try{
        const post=await Posts.find();
        if(!post){
            return res.status(400).json({
                success:false,
                message:"No Post Found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Post found",
            posts:post
        })
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

const createPost=async(req,res)=>{
    try{
        const {user,image,caption,likes,comments}=req.body;
        if(!user || !image  ){
            return res.status(400).json({
                success:false,
                message:"User and Image are Required"
            });
        }
        const newPost=new Posts({
            user,
            image,
            caption,
            likes,
            comments
        });
         const savedPost=await newPost.save();
        if(!newPost){
            return res.status(400).json({
                success:false,
                message:"Post Not Created"
            });
        }

        res.status(201).json({
            success:true,
            message:"Post created Successfully",
            post:savedPost
        })
    }
    catch(error){
        console.log("Error in the creation of Post")
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

const updatePost=async(req,res)=>{
    try{
        const {image,caption}=req.body;
        const postId=req.params._id;
        const updatePost=await Posts.findByIdAndUpdate(postId,{
            image,caption
        },{
            new:true
        })
        if(!updatePost){
            return res.status(400).json({
                success:false,
                message:"Post Not updated"
            });
        }   
        res.status(200).json({
            success:true,
            message:"Post Updated Successfully",
            post:updatePost,
        })
     }
    catch(error){
        console.log("Error in the Updation of Post");
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}

const deletePost=async(req,res)=>{
    try{
        const postId=req.params._id;
        const deletePost=await Posts.findByIdAndDelete(postId);
        if(!deletePost){
            return res.status(400).json({
                success:false,
                message:"Invalid Id"
            })
        }
        res.status(200).json({
            success:false,
            message:"Post Deleted Successfully"
        })
    }
    catch(error){
        console.log("Error in Deletion",error);
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

const updateLikes=async(req,res)=>{
    try{
        const {likes}=req.body;
        const postId=req.params._id;
        const updatePost=await Posts.findByIdAndUpdate(postId,{
            likes
        },{
            new:true
        })
        if(!updatePost){
            return res.status(400).json({
                success:false,
                message:"Likes not Updated"
            })
        }
        res.status(200).json({
            success:true,
            message:"Likes Updated Successfully",
            post:updatePost
        })
        }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}
module.exports={
   getPosts,
   createPost,
   updatePost,
   deletePost,
   updateLikes
 
}