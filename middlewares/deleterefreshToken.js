
const DeleteRefreshToken = async(req,res,next)=>{
    try {
        if(!req.cookies || !req.cookies.RefreshToken ){
            return res.status(200).json({Message:"NO token"})
        }
        else{
            res.clearCookie('RefreshToken',{  path:'/', httpOnly: true });
            return res.status(200).json({messge:"Token deleted successfully"})
        }
        
        } catch (error) {
            console.log("Error in deleting token:",error);
            return res.status(500).json({message:"Internal servrer error"})
        }
        next()
    }
    module.exports = DeleteRefreshToken;