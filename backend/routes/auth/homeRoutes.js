
const express=require("express");
const verifyToken = require("../../middleware/authMiddleware");

const router=express.Router();


router.get('/welcome',verifyToken,(req,res)=>{
    const {userId,username,email}=req.user;
        res.json({
        success:true,
        message:"Welcome to Home Page",
        user:{
            userId,
            username,
            email
        }
    })
})

module.exports=router;