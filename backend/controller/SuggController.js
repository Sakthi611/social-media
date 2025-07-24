const Suggestions = require("../model/Suggestions")



const getAllSuggestions=async(req,res) =>{
    try{
        const user=await Suggestions.find();
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user Found"
            });
        }
        res.status(200).json({
            success:true,
            message:"User Found Successfully",
            user:user
        });
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"Something Went Wrong"
        })
    }

}
const getSuggById=async(req,res)=>{
    try{
        const user=await Suggestions.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user Found with this ID"
            })
        }
        res.status(200).json({
            success:true,
            message:"User Created Successfully",
            user:user
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

const createSuggestion=async(req,res)=>{
    try{
        const user=new Suggestions({
            id:req.body.id,
            name:req.body.name,
            profilePicture:req.body.profilePicture
        })

        await user.save();
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Please enter the Valid Details"
            });
        }
        res.status(201).json({
            success:true,
            message:"User Created Successfully",
            user:user
        })
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"Something Went Wrong!!"
        })
    }
}

const updateSuggestion=async(req,res)=>{
    try{
        
        const {name,profilePicture}=req.body;
        const updateUser=await Suggestions.findByIdAndUpdate(req.params._id,{
            name,profilePicture}
        ,{new :true});
        if(!updateUser){
            return res.status(400).json({
                success:false,
                message:"No user With this Id"
            });
        }
        res.status(200).json({
            success:true,
            message:"Updated User Successfully"
        })
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}
module.exports={
    getAllSuggestions,
    createSuggestion,
    updateSuggestion,
    getSuggById
}