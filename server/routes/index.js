const express = require('express')
const router = new express.Router()

const userRouter = require('./user')

router.get('/',(req,res)=>{
   console.log("hello")
   res.send('Welcome')
})

router.use('/user',userRouter)

module.exports = router