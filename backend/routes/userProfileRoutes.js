

const express=require('express');


const router=express.Router();
const {getController,getControllerById,putController,createUser}=require('../controller/userProfileController');

router.get('/profile',getController);
router.get('/profile/:id',getControllerById);
router.post('/profile',createUser);
router.put('/profile/:id',putController);
// router.delete('/profile/:id,');

module.exports=router;