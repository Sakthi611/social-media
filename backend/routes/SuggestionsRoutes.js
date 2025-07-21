
const{
    getController,
    postController,
    putController
}=require('../controller/SuggController')
const express=require("express");

const router=express.Router();


router.get('/suggestions',getController);
router.post('/suggestions',postController);
router.put('/suggestions/:_id',putController);


module.exports=router;