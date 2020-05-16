const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

class ProfesorAsesoria extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            nombre: {
                type: String,
                required: true
            },
            apellidos: {
                type: String,
                required: true
            },
            correo: {
                type: String,
                unique: true
            },
            correoAd: {
                type: Array,
                required: false
            },
            carrera:{
                type: Array,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            materias: {
                type: Array,
                required: true
            },
            descripcion: {
                type: String,
                required: false
            },
            url: {
                type: String,
                require: true
            },
            horario: {
                type: Array,
                require: true
            }
        })
        this._model = mongoose.model('Profesores', this.schema);
    }

    async getProfesores(){
        return await super.queryOne({},{},{});
    }

    async getProfebyID(uid){
        return await super.queryOne({uid: uid},{},{})
    }

    async getProfebyCorreo(correo){
        return await super.queryOne({correo:correo});
    }

    async createProfesores(profesor){
        let doc = await super.add(profesor)
        return doc;
    }

    async updateProfesor(uid,profesor){
        // console.log({profesorDB: profesor});
        console.log(profesor);
        let doc = await super.update({uid: uid}, profesor);
        console.log(doc);
        return doc;
    }

    async removeAsesoria(uid,materia){

        let doc = await super.queryOne({uid:uid},{},{});
        
        if(doc){
            //elimina materia del arreglo
            let idx = doc.materias.indexOf(materia)
            if(idx > -1){
                doc.materias.splice(idx,1)

                let doc2 = await super.update({uid: uid}, doc)
                console.log({docSchema: doc2});
                return doc2;
            }

        }else{
            return false;
        }
    }

}

let profesor = new ProfesorAsesoria();
let prof = {
    uid: 1,
    url: "https://randomuser.me/api/portraits/men/11.jpg",
    nombre: 'Jefferson',
    apellidos: 'Gutierritos',
    correo: ['profeTest@db.com'],
    password: '12345',
    carrera: ["Ingeniero Civil"],
    carrera: ['Ingenieria Civil'],
    descripcion: '',
    Materias: [1,3],
    horario: [],
}

let profe = {
    uid: 1,
    url: "https://randomuser.me/api/portraits/men/11.jpg",
    nombre: 'Jeff',
    apellidos: 'Gutierritos',
    correo: 'profeTest@db.com',
    correoAd: ['Test@db.com'],
    password: '12345',
    carrera: ["Ingeniero Civil"],
    descripcion: '',
    materias: [1,2],
    horario: [],
}


// profesor.updateProfesor(1,profe);



module.exports = profesor;