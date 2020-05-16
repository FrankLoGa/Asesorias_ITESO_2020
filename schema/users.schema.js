const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

//debe de heredar los metodos de la clase dbUsers
class estudiantes extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                required: true        
            },
            url:{
                type: String,
                required: false
            },
            nombre:{
                type: String,
                required: true
            },
            apellido:{
                type: String,
                required: true
            },
            correo:{
                type: String,
                unique: true
            },
            password:{
                type: String,
                required: true
            },
            carrera:{
                type:String,
                required: true
            },
            descripcion:{
                type: String
            },
            Materias:{
                type: Array,
                required: true
            },
            posts:{
                type: Array,
                required: true
            }
        })
        this._model = mongoose.model('users', this.schema)
    }
    //hereda las funciones, todo sera asincrono
    async getEstudiantes(){
        //regresa todos los estudiantes del modelo
        return await super.query({},{},{});
    }

    async getEstudiantePorCorreo(correo){
        let doc = await super.queryOne({correo:correo})
        console.log(doc);
        return doc
    }

    async createEstudiante(estudiante){
        let doc = await super.add(estudiante)
        console.log({createEstudiante:doc});
        return doc
    }

    async darDeBaja(uidMat,uidAl){
        console.log(uidMat, uidAl);
        let doc = await super.exists({uid: uidAl});
        console.log(doc);
       if(doc){ // verifica que exista el usuario
            console.log(doc.Materias);
            let idx = doc.Materias.indexOf(uidMat)
            if(idx > -1){
                doc.Materias.splice(idx,1)
                // console.log(doc.Materias.splice(idx,1));
                
                //actualiza arreglo de materias del estudiante
                let doc2 = await super.update({uid: uidAl}, doc);
                console.log(doc2);
                return true;

            }else{
                console.log("error");
                return false;
            }
       }else{
           console.log("error");
           return false;
       }
    }


    async updateEstudiante(uid, estudiante){
        let doc = await super.update({uid: uid}, estudiante)
        return doc;
    }

    async EliminarEstudiante(uid){

        let doc = await super.exists({uid: uid});
        if(doc){
            doc = super.delete({uid:uid});
            if(doc){
                console.log("object");
                return true;
            }
            else{
                console.log("error");
                return false;
            }
        }   else{
            console.log("error");
            return false;
        }


    }

}

let estudiante = new estudiantes();


let pruebaEstudiante = {
    uid: 1,
    url: "https://randomuser.me/api/portraits/men/5.jpg",
    nombre: 'Alvin',
    apellido: 'Yakitory',
    correo: 'Test@DB',
    password: '12345',
    carrera: 'Ingenieria Electronica',
    descripcion: '',
    Materias: [1,3],
    posts: []
}


// estudiante.add(pruebaEstudiante)
// estudiante.getEstudiantePorCorreo("Test@DB");
//exportar 
module.exports = estudiante;




