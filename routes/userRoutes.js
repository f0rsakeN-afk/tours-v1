const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')


router.post('/register', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);



module.exports=router;