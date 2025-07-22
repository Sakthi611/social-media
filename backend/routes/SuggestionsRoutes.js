
const{
    getController,
    postController,
    putController,
    getControllerById
}=require('../controller/SuggController')
const express=require("express");
// const { getControllerById } = require('../controller/userProfileController');

const router=express.Router();


router.get('/suggestions',getController);
router.get('/suggestions/:id',getControllerById);
router.post('/suggestions',postController);
router.put('/suggestions/:_id',putController);


module.exports=router;