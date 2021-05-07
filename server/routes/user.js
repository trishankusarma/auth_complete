const express = require('express')
const router = new express.Router()

const { userController } = require('../controllers')
const { userAuth } = require('../middleware')

const { login , register , getProfile , updateProfile , activateAcount , forgetPassword , updatePassword , logout } = userController

//get User Profile
router.get('/', userAuth , getProfile)

//Create User -> register
router.post('/register',register)

//Login User
router.post('/login',login)

//Email Confirmation
router.post( '/activateEmail/:activationToken' , activateAcount )

//Forget Password
router.post('/forgetPassword',forgetPassword)

//update Password
router.post('/updatePassword',updatePassword)

//Update Profile
router.patch('/update', userAuth ,updateProfile)

//logout 
router.get('/logout', userAuth ,logout)

module.exports = router