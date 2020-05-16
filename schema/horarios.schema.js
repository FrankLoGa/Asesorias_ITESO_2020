const mongoose = require('../DB/mongodb-connect.js');
const dbUsers = require('../DB/generalSchema.js')

class horarios extends dbUsers{
    constructor(){
        super();
        this.schema = mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            profesor:{
                type: Number,
                required: true
            },
            nombre:{
                type: String,
                required: true
            },
            Dias: {
                type: String,
                require: true
            },
            hora:{
                type: String,
                required: true
            },
            salon:{
                type: String,
                required: true
            },
            Materia:{
                type: Number,
                required: true
            }

        })
        this._model = mongoose.model('Horarios', this.schema);
    }


    async getHorarios(){
        return await super.query({},{},{})
    }

    async getHorariosByClass(Materia){
        let doc = await super.exists({Materia});
        if(doc){
            return await super.query(Materia);
        }else{
            return false;
        }
    }


    async updateHorario(profesor, horario){
        console.log(profesor);
        let doc = await super.update({profesor: profesor}, horario);
        console.log(doc);
        return doc;
        
    }

}

let horarioN = new horarios();
module.exports = horarioN;


