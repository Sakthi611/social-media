
const jwt=require('jsonwebtoken');


const verifyToken=async(req,res,next)=>{

    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Access Denied"
        })
    }
    //decode a token
    try{
        const decodeToken=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodeToken);
        req.user=decodeToken;
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
    console.log("working");
    next();
    
}

module.exports=verifyToken;