const router = require('express').Router()
const comment = require('../schema/comments.schema')



router.get('/:postId', async(req, res)=>{
    let doc = await comment.getCommentByPost(req.params.postId);
    res.status(200).send(doc);
})

router.post('',async(req,res)=>{
    let doc = await comment.postComment(req);
    res.status(200).send(doc);
})

module.exports = router;