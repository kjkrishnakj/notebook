const express  =require("express")
const router =express.Router();
const User = require("../models/User");   
const {body,validationResult} = require("express-validator")   
const bcrypt = require("bcryptjs");
var JWT = require("jsonwebtoken");

const JWT_SECRET = "hellomynameiskr$na!";

router.post('/createuser', [body('name').isLength({min:3}),body('email').isEmail(),body('password').isLength({min:5})],async(req,res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
   }
   let user =await User.findOne({email :req.body.email});
   if(user){
      return res.status(400).json({error:"email already exists!"})
   }
   const salt= await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password,salt)
   user=await User.create({
      name: req.body.name,
      email:  req.body.email,
      password:  secPass
   })
   const data= {
      user:{
         id : user.id
      }
   }
   const authToken = JWT.sign(data,JWT_SECRET);
   res.json({authToken});
})
module.exports = router; 