const bcrypt=require("bcrypt");

const User=require("../../model/User");
const jwt=require("jsonwebtoken");


const registerController=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const checkUser=await User.findOne({
            $or:[{username},{email}]
        });
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }
        //hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const  newUser=new User({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save();
        if(!newUser){
            return res.status(400).json({
                success:false,
                message:"User not Created"
            })
        }
        res.status(201).json({
            success:true,
            message:"User Created Successfully",
            user:newUser
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}


const loginController=async(req,res)=>{
    try{
        const {username,password}=req.body;
        //check the user is exists or not

        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid Credientials"
            })
        }

        //check the password

        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:"Invalid Password .Please Login Again"
            });
        };

        //web token

        const accessToken= await jwt.sign({
            user_id:user._id,
            username:user.username,
            email:user.email
        },process.env.JWT_SECRET_KEY,
        {
            expiresIn:"15m"
        });
        

        res.status(200).json({
            success:true,
            message:"Login Successfully",
            token:accessToken
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports={
    registerController,
    loginController
}