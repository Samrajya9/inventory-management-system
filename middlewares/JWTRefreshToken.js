const jwt =require("jsonwebtoken");

const GenerateRefreshToken = async(payload,tokenSecret)=>{
   const token =jwt.sign(payload,tokenSecret)
    return token
 
}

module.exports= GenerateRefreshToken;