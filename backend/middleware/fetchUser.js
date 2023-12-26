var JWT = require("jsonwebtoken");
const JWT_SECRET="hellomynameiskr$na!";
const fetchuser =(req,res,next)=>{
    
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Invalid Token!"})
    }
    try{

        const data = JWT.verify(token,JWT_SECRET) 
        req.user = data.user;
        next()
    }catch(e){
        res.status(401).send({error:"Invalid Token!"})
    }
}

module.exports =fetchuser;