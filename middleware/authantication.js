
const auth = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    var {userId} = jwt.verify(token, 'hola');
    if(decoded){
        req.body.userId = userId
        next()
    }
    else{
        res.send({"msg":"Please login"})
    }
}


module.exports = {auth}