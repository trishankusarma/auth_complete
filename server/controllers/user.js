const { User } = require('../models')
const { sendEmail , cookieConfig } = require('../utils')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userController = {
   
    login: async (req,res)=>{
       
        try {
            
            const { email , password } = req.body

            const user = await User.findByCredentials( email , password )

            if(!user){
                return res.json({
                    success:0,
                    msg:'Invalid Credentials',
                    user:null
                })
            }

            const token = await user.generateAuthToken()
           
            res.cookie('authorization',token , cookieConfig )

            res.json({
                success:1,
                msg:'Login Successful',
                user
            })

        } catch (error) {
            res.json({
                success:0,
                msg:'Internal Server Error! Please register again!',
                user:null
            })
        }
    },
    
    register: async ( req,res )=>{

      try {
          const { name , email , phoneNo, password } = req.body

          const existUser = await User.findOne({email})
          
          if(existUser){
              return res.json({
                  success:0,
                  msg:'User Already Exists with that Email',
                  user:null
              })
          }
           
          const user = await User({
              name , email , phoneNo, password
          })

          const activation_token = await user.generateActivationToken()

          const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
          
          sendEmail(email, url, "Verify your email address")

          res.json({
            success:1,
            msg:'An Email has been sent to your registered email.',
            user:null
         })

      } catch (error) {

        res.json({
            success:0,
            msg:'Internal Server Error! Please register again!',
            user:null
        })
      }
    },

    activateAcount: async(req,res)=>{
      try {
          
         const { activationToken } = req.params

         const user = await jwt.verify( activationToken ,process.env.ACTIVATION_TOKEN_SECRET) 

         const {  name , email , phoneNo , password } = user 

         const existUser = await User.findOne({email})
          
         if(existUser){
             return res.json({
                 success:0,
                 msg:'User Already Exists with that Email',
                 user:null
             })
         }

         const newUser = User({
             name, email , phoneNo , password
         })

         await newUser.save()

         const token = await newUser.generateAuthToken()

         res.cookie( 'authorization' , token , cookieConfig)

         res.json({
             success:1,
             msg:'Account has been activated',
             user:newUser
         })

      } catch (error) {
       
        res.json({
            success:0,
            msg:'Internal Server Error! Please register again!',
            user:null
        })

      }
    },

    forgetPassword: async(req,res)=>{
        try {
            const { email } = req.body
  
            const existUser = await User.findOne({email})
            
            if(!existUser){
                return res.json({
                    success:0,
                    msg:'No user with this email exists',
                    user:null
                })
            }
  
            const access_token = await existUser.generateAccessToken()
  
            const url = `${process.env.CLIENT_URL}/user/forgetPassword/${access_token}`
            
            sendEmail(email, url, "Change your Password")
  
            res.json({
              success:1,
              msg:'An Email has been sent to your registered email.Click to change Password',
              user:null
           })
  
        } catch (error) {
  
          res.json({
              success:0,
              msg:'Internal Server Error! Please enter your email again!',
              user:null
          })
        }
    },

    updatePassword: async (req,res)=>{
      try {
          const { access_token , newPassword } = req.body

          jwt.verify( access_token , process.env.ACCESS_TOKEN_SECRET ,async (err , user)=>{
              
             if(err){
                return res.json({
                    success:0,
                    msg:'Invalid Token',
                    user:null
                })
              }

               const userU = await User.findById(user._id)

               const isSame = await bcrypt.compare( newPassword , userU.password)

               if(isSame){
                   
                return res.json({
                    success:0,
                    msg:'Please Set New Password',
                    user:null
                })
               }

               userU.password = newPassword
              
               await userU.save()

               const token = await userU.generateAuthToken()

               res.cookie('authorization',token,cookieConfig)

              res.json({
                success:1,
                msg:'Password Updated',
                user:userU
             })
          })
      } catch (error) {
        res.json({
            success:0,
            msg:'Internal Server Error! Please try again!',
            user:null
        })
      }
    },

    getProfile : (req,res)=>{
      try {
        res.json({
            success:1,
            msg:"User",
            user:req.user
        })
      } catch (error) {
        res.json({
            success:0,
            msg:"Internal Server Error! Please try Again",
            user:null
        })
      }
    },

    updateProfile: async (req,res)=>{
        try {
            const updates=Object.keys(req.body);
            const user = req.user;

            updates.forEach((update)=>user[update]=req.body[update]);
            await user.save();

            res.json({
                success:1,
                msg:"User Updated",
                user
            });  

          } catch (error) {

            res.json( {
                success:0,
                msg : 'Internal Server Errors',
                user:null
           });
          }
    },

    logout : async (req,res)=>{
        try {
            res.clearCookie('authorization')

            res.json({
                success:1,
                msg:"Successfull Logged Out",
                user:null
            })
        } catch (error) {
            
            res.json({
                success:0,
                msg:"Internal Server Error! Please Try Again",
                user:null
            })
        }
    }
}

module.exports = userController