const router = require('express').Router()
const materias = require('../schema/materias')
const auth = require('../middlewares/auth');

router.get('',auth.checkToken,async (req,res)=>{
    let doc = await materias.getMaterias()
    res.status(200).send(doc)
})

router.get('/:nombre',auth.checkToken,async (req,res)=>{
    let doc = await materias.getMateriaByName(req.params.nombre)
    res.status(200).send(doc)
})


router.put('/:id',auth.checkToken, async(req,res)=>{
    let doc = await materias.removeEstudiante(req.params.uidMat, req.body.uidAl);
    res.status(200).send(doc)
})


module.exports = router;