const express=require('express');
const router=express.Router();
const borrowController=require('../controllers/borrow.controller');

router.post("/boorowbook",borrowController.borrorbooks);
router.post("/returnbook",borrowController.returnBook);
router.post("/updatebook",borrowController.updateBook);
module.exports=router;