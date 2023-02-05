const express=require('express')
const router=express.Router()
const {registerUser, loginUser, getMe}= require('../controllers/userController')

// console.log('Reached routes\n')
const {protect}=require('../middleware/authMiddleware')
router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect, getMe)


module.exports= router
console.log('Exit routes\n')
