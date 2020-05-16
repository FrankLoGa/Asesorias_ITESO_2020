const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

class materialClase extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            materia:{
                type: Number,
                required: true
            },
            profesor:{
                type: Number,
                required: true
            },
            file: {
                type: Array,
                require: true
            },
            fileUrl:{
                type: Array,
                required: true
            }

        })
        this._model = mongoose.model('materialclases', this.schema);
    }

    async getMaterialClase(){
        return await super.query({},{},{});
    }

    async getMaterialClasebyId(uid){
        return await super.queryOne({uid: uid},{},{});
    }

    async createMaterial(material){
        let ver = await super.queryOne({uid: material.uid, materia: material.materia, profesor: material.profesor},{},{});

        //si regesa algo es porque ya existe, manda error
        if(ver == null){
            let doc = await super.add(material);
            return doc;  
        }else{
            return false;
        }
        
    }

    async updateMaterial(url,file,uid){
        let doc = await super.exists({uid:uid})
        console.log({exists:doc});
        if(doc){
            console.log({updateMaterial:doc});
            doc.file.push(file)
            doc.fileUrl.push(url)

            let doc2 = await super.update({uid: uid}, doc);
            return doc2
        }else{
            return false;
        }

    }

    async removeMaterial(uid,fileUrl,file){
        let doc = await this.getMaterialClasebyId(uid);
        console.log({docPrueba: doc});

        if(doc){
            for (let index = 0; index < doc.file.length; index++) {
                if(doc.fileUrl[index] == fileUrl && doc.file[index] == file){
                    //elimina de file y fileurl los elementos en index
                    doc.file.splice(index,1)
                    doc.fileUrl.splice(index,1)

                    let doc2 = await super.update({uid: uid}, doc)
                    return doc2;
                }
                
            }
        }else{
            return false;
        }
    }
}

let materialAyuda = new materialClase();
material = {
    uid: 2,
    materia: 3,
    profesor: 1,
    file: [
        "Introducción"
    ],
    fileUrl: [
        "https://www.estadisticaparatodos.es/historia/historia.html"
    ]
}
// materialAyuda.add(material)
// materialAyuda.updateMaterial("sfgfd","intro",7)

module.exports = materialAyuda;

