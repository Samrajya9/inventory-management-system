const jwt= require('jsonwebtoken')

function authenticateToken (req,res,next){
    const authHeder = req.headers['authorization']
    const token = authHeder && authHeder.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"No Access"})
    }else{
        jwt.verify(token,process.env.ACCEESS_TOKEN_SECRET,(err,payload)=>{
            if(err){return res.status(403).json({Message:"no valid token"})}
            else{
                req.payload=payload
                next();
            }
        })
    }
};

module.exports= authenticateToken;