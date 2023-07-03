function authenticateRole(role){
 return (req,res,next)=>{
    if(req.payload.Role !== role){
        res.status(401)
        return res.send("Not allowed")
    }
    next();
 }
}
module.exports = authenticateRole;