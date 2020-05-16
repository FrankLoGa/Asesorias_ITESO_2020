const router = require('express').Router()
// const mongoose = require('../DB/mongodb-connect.js');
const profesor = require('../schema/profesores.schema');
const alumnos = require('../schema/users.schema')
const jwt = require('jsonwebtoken');

router.post('', async (req,res)=>{
    let {correo,password} = req.body;
    
    if(correo && password){
        
        let profe = await profesor.getProfebyCorreo(correo);
        // console.log(profe);
        if(profe){
            //compara las passwords
            // console.log("entro profe");
            if(profe.password == password){
                let token = jwt.sign({correo: profe.correo}, "secreto",{expiresIn: '1h'} )
                //localStorage.setItem('token', token)
                //console.log({tokn: window.localStorage.token});
                res.send({token, usuario: "Profesor", correo: correo});
            }else{
                res.status(401).send({error: "verifique usuario y password"})
            }

        }else{
            let alumno = await alumnos.getEstudiantePorCorreo(correo)
            // console.log("object");
            if(alumno){
                //compara las passwords
                if(alumno.password == password){
                    let token = jwt.sign({correo: alumno.correo},"secreto", {expiresIn: '1h'})
                    // localStorage.setItem('token', token)
                    res.send({token, usuario: "Estudiante", correo: correo});

                }else{
                res.status(401).send({error: "verifique usuario y password"})
            }

            }else{
                res.status(404).send({error: "Usuario no encontrado"})
            }
        }
    }
})

module.exports = router;
