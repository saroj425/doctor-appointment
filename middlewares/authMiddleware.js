const jwt = require("jsonwebtoken")

module.exports = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    //console.log("authHeader",authHeader);
    try {
        //console.log("Hearder",authHeader)
        const token = authHeader.split(" ")[1];
        //console.log("Token", token)
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).send({
                    message:"Authorization Failed",
                    success:false
                })
            }else{
                req.body.userId = decoded.id;
                next();
            }
        })
    } catch (error) {
        res.status(401).send({
            message:"Auth Failed",
            success: false
        })
    }
}