

const mongoose =require("mongoose");

const connectDB=async()=>{
    try{
        
        await mongoose.connect("mongodb+srv://ssakthiswaran26:ssakthiswaran611@cluster0.siska1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Mongo Db connected Succesfully");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectDB;