
const express=require('express');
const {
    getPosts,
    createPost,
    updatePost,
    deletePost
}=require('../controller/PostsController')


const router=express.Router();

router.get('/posts',getPosts);
router.post('/posts',createPost);
router.put('/posts/:_id',updatePost);
router.delete('/posts/:_id',deletePost);

module.exports=router;