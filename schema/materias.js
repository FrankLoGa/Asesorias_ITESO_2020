const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

class materiaClase extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            nombre:{
                type: String,
                required: true
            },
            profesores:{
                type: Array,
                required: true
            },
            alumnos:{
                type: Array,
                required: true
            }
        })
        this._model = mongoose.model('Materias', this.schema);
    }

    async getMaterias(){
        return await super.query({},{},{})
    }

    //pruebas
    async createMateria(materia){
        let doc = await super.add(materia);
        return doc;
    }


    async getMateriaByName(nombre){
        let doc = await super.queryOne({nombre: nombre},{},{})
        return doc;
    }

    async removeEstudiante(uidM, uidAl){
        let doc = await super.exists({uid:uidM})
        // console.log(uidM);
        // console.log({materia: doc});
        if(doc){
            let idx = doc.alumnos.indexOf(uidAl);

            if(idx > -1){
                doc.alumnos.splice(idx,1)
                let doc2 = await super.update({uid: uidM}, doc)
                console.log({clgDoc2: doc2});
                return doc2;
            }
        }else{
            return false;
        }
    }

}
let materia = new materiaClase();

let mat = {
    uid: 1,
    nombre: "Calculo Integral", 
    profesores: [
        1
    ],
    alumnos: [
        1
    ]
}
materia.removeEstudiante(3,1);
// materia.add(mat)
// materia.add(mat2)
// materia.add(mat3)
// materia.add(mat4)

module.exports = materia;