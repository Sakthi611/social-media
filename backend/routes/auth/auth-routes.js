
const express=require("express");
const { registerController, loginController } = require("../../controller/auth/authController");

const router=express.Router();

router.post("/signup",registerController);
router.post('/login',loginController);

module.exports=router;