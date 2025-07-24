
const{
    getAllSuggestions,
    createSuggestion,
    updateSuggestion,
    getSuggById,
}=require('../controller/SuggController')
const express=require("express");


const router=express.Router();


router.get('/suggestions',getAllSuggestions);
router.get('/suggestions/:id',getSuggById);
router.post('/suggestions',createSuggestion);
router.put('/suggestions/:_id',updateSuggestion);


module.exports=router;