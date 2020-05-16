const router = require('express').Router();
const post = require('../schema/posts.schema');
const auth = require('../middlewares/auth');


router.get('',auth.checkToken,async(req,res)=>{
    let doc = await post.getPosts();
    res.status(200).send(doc);
})

router.get('/:nombre',auth.checkToken, async(req, res)=>{
    let doc = await post.getPostsByClass(req.nombre);
    res.status(200).send(doc);
})

router.post('/',auth.checkToken,async(req,res)=>{
    let doc = await post.createPost(req.body);
    res.status(200).send(doc)
})


module.exports = router;