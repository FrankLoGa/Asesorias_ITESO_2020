const router = require('express').Router()
const estudiante = require('../schema/users.schema')
const auth = require('../middlewares/auth');

router.get('',auth.checkToken,async(req,res)=>{
    let doc = await estudiante.getEstudiantes()
    res.status(200).send(doc)
})


router.put('/:id',auth.checkToken, async(req,res)=>{
    let doc = await estudiante.darDeBaja(req.body.uidMat,req.params.id)
    res.status(200).send(doc)
})

router.put('/update/:id', auth.checkToken, async(req,res)=>{
    let doc = await estudiante.updateEstudiante(req.params.id, req.body)
    res.status(200).send(doc)
})

router.get('/:correo',auth.checkToken, async(req,res)=>{
    let doc = await estudiante.getEstudiantePorCorreo(req.params.correo)
    console.log({correo: doc});
    res.status(200).send(doc);
})

module.exports = router