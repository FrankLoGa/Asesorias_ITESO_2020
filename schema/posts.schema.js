const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

class foroPost extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            autor:{
                type: String,
                required: true
            },
            title:{
                type: String,
                required: true
            },
            message: {
                type: String,
                require: true
            },
            materia:{
                type: Number,
                required: true
            }

        })
        this._model = mongoose.model('Posts', this.schema);
    }
    async getPosts(){
        return await super.query({},{},{})
    }

    async getPostsByClass(Materia){
        let doc = await super.exists({Materia});
        if(doc){
            return await super.query({Materia})
        }else{
            return false;
        }
    }


    async createPost(post){
        let ver = await super.queryOne({uid: post.uid,  
            autor: post.autor,
            title: post.title,
             message: post.message,
              materia: post.materia},{},{});

              console.log(post);

        //si regesa algo es porque ya existe, manda error
        if(ver == null){
            let doc = await super.add(post);
            console.log(doc);
            return doc;  
        }else{
            return false;
        }
    }
} 



let npost = new foroPost();

let body = {
        uid: 2, 
        autor: "Pedro", 
        title: "Duda", 
        message : "Tengo dudas", 
        materia:1 
}

/*npost.createPost(body);*/


module.exports = npost;

