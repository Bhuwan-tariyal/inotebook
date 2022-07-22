//its a middleware , A middle is a fuction
const jwt=require('jsonwebtoken');
const JWT_SECERT='bhu.one';
const fetchuser= (req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
    try {
        const data=jwt.verify(token,JWT_SECERT);
        req.user=data.user;
    next();
    } catch (error) {
        console.log(error.message);
      res.status(401).send({error:"please authenticate using a valid token"});
    }
    
}

module.exports= fetchuser;