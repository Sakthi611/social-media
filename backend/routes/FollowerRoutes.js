

const express=require('express');
const {
    getFollower,
    getFollowerById,
    createFollower,
    updateFollower,
    removeFollower
}=require('../controller/FollowerController.js');
const router=express.Router();

router.get('/followers',getFollower);
router.get('/followers/:id',getFollowerById);
router.post('/followers',createFollower);
router.put('/followers/:id',updateFollower);
router.delete('/followers/:id',removeFollower);

module.exports=router;