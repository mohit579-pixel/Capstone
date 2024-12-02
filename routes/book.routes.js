const express=require('express');
const router=express.Router();
const bookController=require('../controllers/book.controller');

router.get('/allbooks',bookController.getBooks);
router.post('/insertbook',bookController.insertbook);
router.post('/borrow',bookController.borrorbooks);
module.exports=router;