

const express=require("express");

const {
    getAllStories,
    createStory,
    updateStory,
    deleteStory,
    getStoryById,
    removeAllStories
}=require('../controller/StoryController');


const router=express.Router();


router.get('/story',getAllStories);
router.post('/story',createStory);
router.put('/story/:_id',updateStory);
router.delete('/story/deleteAll',removeAllStories);
router.delete('/story/:_id',deleteStory);
router.get('/story/:id',getStoryById);



module.exports=router;

