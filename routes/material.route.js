const router = require('express').Router()
const Material = require('../schema/Material.schema')
const auth = require('../middlewares/auth');

router.get('', auth.checkToken,async(req,res)=>{
    let doc = await Material.getMaterialClase()
    res.status(200).send(doc)
})

router.put('/:materialId',auth.checkToken, async(req,res)=>{
    console.log('Entre put');
    console.log({reqparams:req.params});
    let doc = await Material.updateMaterial(req.body.fileUrl, req.body.file, req.params.materialId)
    console.log(doc);
    res.status(200).send(doc)
})

router.put('/removemat/:materialId',auth.checkToken, async(req,res)=>{
    let doc = await Material.removeMaterial(req.params.materialId, req.body.fileUrl, req.body.file)
    res.status(200).send(doc)
})

module.exports = router;