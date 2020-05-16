const jwt = require('jsonwebtoken')
function checkToken(req,res,next){
    const token = req.get('x-auth');

    if(token){
        console.log(token);
        jwt.verify(token, "secreto", function(err,payload){
            if(err){
                res.status(401).send({error: "token invalido"})
            }else{
                req.correo = payload.correo
                // localStorage.setItem('token', token)
                next();
            }
        })
    }else{
        res.status(401).send({error: "No esta autorizado"})
    }
}

module.exports = {checkToken};