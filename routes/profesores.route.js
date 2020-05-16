const router = require('express').Router()
const profesor = require('../schema/profesores.schema')
const auth = require('../middlewares/auth');

router.get('',auth.checkToken,async(req,res)=>{
    let doc = await profesor.getProfesores();
    res.status(200).send(doc);
})

router.put('/:id',auth.checkToken,async(req,res)=>{
    let doc = await profesor.updateProfesor(req.params.id, req.body);
    res.status(200).send(doc)
})

router.put('/quitaAsesorias/:id',auth.checkToken ,async(req,res)=>{
    let doc = await profesor.removeAsesoria(req.params.id, req.body.materia);
    res.status(200).send(doc)
})

router.get('/:correo',auth.checkToken ,async(req,res)=>{
    let doc = await profesor.getProfebyCorreo(req.params.correo)
    res.status(200).send(doc)
})

module.exports = router;