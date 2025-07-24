const  Story = require("../model/Story");



const getAllStories=async(req,res)=>{
    try{
        const story=await Story.find();
        if(!story){
            return res.status(400).json({
                success:false,
                message:"No Story Found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Story Found Successfully",
            story:story
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        });
    }
}

const getStoryById=async(req,res)=>{
    try{
        const story=await Story.findOne({id:Number(req.params.id)});
        if(!story){
            return res.status(400).json({
                success:false,
                message:"Invalid Id"
            })
        }
        res.status(200).json({
            success:true,
            message:"Story Found Successfully",
            story:story
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}

const createStory=async(req,res)=>{
    try{
        const {id,user,image,caption}=req.body;
        const newStory=new Story({
            id,
            user,
            image,
            caption
        },
   )
    const savedStory=await newStory.save();
    if(!savedStory){
        return res.status(400).json({
        success:false,
        message:"Story Not Created"
        })
    }

    res.status(201).json({
        success:true,
        message:"Story Created Successfully",
        story:savedStory
    })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        });
    }
}



const updateStory=async(req,res)=>{
    try{
        const {image,caption,user}=req.body;
        const updateStory=await Story.findByIdAndUpdate(req.params._id,{
            image,caption,user
                },
    {new:true})

    if(!updateStory){
        return res.json(400).json({
            success:false,
            message:"Story Not Updated"
        })
    }

    res.status(200).json({
        success:true,
        message:"Story Updated Successfully",
        story:updateStory,
    })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

const deleteStory=async(req,res)=>{
    try{
        const deleted=await Story.findByIdAndDelete(req.params._id);
        if(!deleted){
            return res.status(400).json({
                success:false,
                message:"Invalid Id Entered"
            })
        }
        res.status(200).json({
            
            success:true,
            message:"Story Deleted Successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

const removeAllStories=async(req,res)=>{
    try{
        const deleted =await Story.deleteMany();
        if(deleted.deletedCount===0){
            return res.status(200).json({
                success:true,
                message:"No Stories were found To delete"
            })
        }
        res.status(200).json({
            success:true,
            message:"All Stories Deleted Successfully"
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

module.exports={
    getAllStories,
    createStory,
    updateStory,
    deleteStory,
    getStoryById,
    removeAllStories
}