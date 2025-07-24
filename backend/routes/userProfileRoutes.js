

const express=require('express');


const router=express.Router();
const {getAllUser,getUserById,updateUser,createUser}=require('../controller/userProfileController');

router.get('/profile',getAllUser);
router.get('/profile/:_id',getUserById);
router.post('/profile',createUser);
router.put('/profile/:_id',updateUser);
// router.delete('/profile/:id,');

module.exports=router;