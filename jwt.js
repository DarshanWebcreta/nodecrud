const jwt = require('jsonwebtoken');


const generateToken = (userdata)=>{
    return jwt.sign(userdata,process.env.JWT_Sec,{expiresIn:30000})
}

const jwtMiddleWare = (req,res,next)=>{
    const token  = req.headers.authorization;
    if(!token)  res.status(401).json({status:401,error:"Please provide token"})
        const jwtToken = req.headers.authorization.split(' ')[1];
    if(!jwtToken)  res.status(401).json({status:401,error:"Not authorized"});

    try{
        const gotToken = jwt.verify(jwtToken,process.env.JWT_Sec);
        req.user = gotToken;
        next();
    }
    catch(err){
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = {generateToken,jwtMiddleWare};