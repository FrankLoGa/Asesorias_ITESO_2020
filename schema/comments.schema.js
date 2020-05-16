const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

class comentarios extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            body:{
                type: String,
                required: true
            },
            postId:{
                type: Number,
                required: true
            }

        })
        this._model = mongoose.model('materialclases', this.schema);
    }




    async getCommentByPost(postId){
        let doc = await super.exists({postId: postId});
        if(doc){
            return await super.query( {postId: postId})
        }else{
            return false;
        }
    }

    async postComment(post){
        let ver = await super.queryOne({uid:post.uid, body:post.body, postId:post.postId},{},{});

        //si regesa algo es porque ya existe, manda error
        if(ver == null){
            let doc = await super.add(post);
            return doc;  
        }else{
            return false;
        }
        
    }
}