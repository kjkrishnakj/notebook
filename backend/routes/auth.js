const express = require("express")
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
var JWT = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const JWT_SECRET = "hellomynameiskr$na!";

router.post('/createuser', [body('name').isLength({ min: 3 }), body('email').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).json({ error: "email already exists!" })
   }
   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password, salt)
   user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
   })
   const data = {
      user: {
         id: user.id
      }
   }
   const authToken = JWT.sign(data, JWT_SECRET);
   res.json({ authToken });
})


router.post('/login', [body('email').isEmail(),
 body('password').exists()], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   const {email,password} = req.body;
   try {
      let user = await User.findOne({ email })
      if (!user) {
         return res.status(400).json({ errors: "Invalid credentials!" })
      }
      const passcmp = await bcrypt.compare(password, user.password);
      if (!passcmp) {

         return res.status(400).json({ errors: "Invalid credentials!" })
      }
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = JWT.sign(data, JWT_SECRET);
      res.json({ authToken });

   } catch (e) {
      return res.status(500).send(e)
      
   }
   
   
   
   
   
   router.post('/getuser', fetchuser,async (req, res) => {
   try{
      userId = req.user.id;
      const user = await User.findById(userId).select("-password") 
      res.send(user);
   }catch(e){
      return res.status(500).send(e)
   }
   })    


})
module.exports = router; 