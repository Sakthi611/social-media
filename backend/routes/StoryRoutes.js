

const express=require("express");

const {
    getController,
    postController,
    putController,
    deleteController,
    getControllerById,
    deleteAllController
}=require('../controller/StoryController');


const router=express.Router();


router.get('/story',getController);
router.post('/story',postController);
router.put('/story/:_id',putController);
router.delete('/story/deleteAll',deleteAllController);
router.delete('/story/:_id',deleteController);
router.get('/story/:id',getControllerById);



module.exports=router;

