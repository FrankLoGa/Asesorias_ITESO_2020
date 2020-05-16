const mongoose = require('mongoose');
let user = "dbUser";
let password = "testUserApp"
let dbName = "dbUsers"
const dbURL = `mongodb+srv://${user}:${password}@cluster0-0fpwb.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(dbURL, {
    userNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conectado a la base de datos");
}).catch((err)=> console.log("No se pudo establecer coneccion"))

module.exports = mongoose;
