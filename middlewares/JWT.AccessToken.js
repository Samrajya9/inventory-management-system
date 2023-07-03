const jwt =require("jsonwebtoken");

const GenerateAccesToken = async (payload,tokenSecret)=>{
   const token =jwt.sign(payload,tokenSecret,{expiresIn:'30s'})
    return token
}

module.exports= GenerateAccesToken;