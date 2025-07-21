
const express=require('express');
const {
    getController,
    postController,
    putController,
    deleteController
}=require('../controller/PostsController')


const router=express.Router();

router.get('/posts',getController);
router.post('/posts',postController);
router.put('/posts/:_id',putController);
router.delete('/posts/:_id',deleteController);

module.exports=router;