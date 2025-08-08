
const express=require('express');
const {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    updateLikes
}=require('../controller/PostsController')


const router=express.Router();

router.get('/posts',getPosts);
router.post('/posts',createPost);
router.put('/posts/:_id',updatePost);
router.delete('/posts/:_id',deletePost);
router.put('/posts/likes/:_id',updateLikes)

module.exports=router;