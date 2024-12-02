const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller')
router.post('/register',userController.registerUser);

router.post('/login',userController.loginUser);
router.get('/getusers',userController.getUsers);

module.exports=router;