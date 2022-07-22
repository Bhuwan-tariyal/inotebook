const express=require('express');
const User = require('../models/User');
const router =express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECERT='bhu.one';
//route 1:
//Create a User using :POST "/api/auth"-doesnt require auth ,no login require
router.post('/createuser',[body('name','enter a valid name').isLength({min:3}), //validation of email and password
body('email','enter the valid email').isEmail(),
body('password','password must be atleast 5 character').isLength({ min: 5 })],
async(req,res)=>{
  let success=false;
  //if there are errors ,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check whether the user with this email exist already
    try{
    let user=await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({success,error:"this user already exists with this email"});
    }
    //genrate the salt 
    const salt= await bcrypt.genSalt(10);
    //trsnslate the password into hashcode
    let secpass= await bcrypt.hash(req.body.password,salt) ;
    //create a new user 
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      })
      
      // .then(user => res.json(user))
      // .catch(err=> {res.json({error: 'please enter a unique value for email',message: err.message})})
    const data={
      user:{
        id:user.id //id genrated by mongodb
      }
    }
    //passing the token with the help of jsonwebtoken and add the signature to the id
    const authtoken=jwt.sign(data,JWT_SECERT);      
    // console.log(authtoken);
      // res.json(user)
      success=true;
    res.json({success,authtoken});
    }catch(error){
      console.log(error.message);
      res.status(500).send("Some error ouccer");
    }

})

//route 2:

// authenticate a user:post "/api/auth"- ,no login required 
router.post('/login',[
body('email','enter the valid email').isEmail(),
body('password','password can not be blank').exists()],
async(req,res)=>{
    let success=false;
    //if there are errors ,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password}=req.body
    try {
      let user=await User.findOne({email});
      if(!user){
        success=false;
        return res.status(400).json({success,error:"try to log in with correct credential"});
      }
      const passwordcompare=await bcrypt.compare(password,user.password);
      if(!passwordcompare){
        success=false;
        return res.status(400).json({success,error:"try to log in with correct credential"});
      }
      const data={
        user:{
          id:user.id //id genrated by mongodb
        }
      }
      const authtoken=jwt.sign(data,JWT_SECERT); 
      success=true;
      res.json({success,"authtoken":authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server  error");
    }
})

//route 3: get login user details using post "/api/auth/getuser".  login required 
router.post('/getuser',fetchuser,async(req,res)=>{
     try {
          userId=req.user.id;
          const user= await User.findById(userId).select("-password");
          res.send(user);
     } catch (error) {
      console.log(error.message);
      res.status(500).send("server  error");
     }

  })
module.exports=router