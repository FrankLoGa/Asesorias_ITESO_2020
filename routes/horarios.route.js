const router = require('express').Router()
const horario = require('../schema/horarios.schema')
const auth = require('../middlewares/auth');

router.get('',async(req,res)=>{
    let doc = await horario.getHorarios();
    res.status(200).send(doc);
})

router.get('/:Materia', async(req, res)=>{
    let doc = await horario.getHorariosByClass(req.params.Materia);
    res.status(200).send(doc);
})

router.put('/:profesor',async(req,res)=>{
    let doc = await profesor.updateProfesor(req.params.profesor, req.body);
    res.status(200).send(doc)
})

module.exports = router;