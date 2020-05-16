const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

const routeLogin = require('./routes/login');
const routeEstudiante = require('./routes/estudiante.route')
const routeMaterias = require('./routes/materias.route')
const routerMaterial = require('./routes/material.route')
const routerProfesor = require('./routes/profesores.route')
const routerHorario = require('./routes/horarios.route')
const routerPosts = require('./routes/posts.route')
const routerComment = require('./routes/comments.route')
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname+'/public'))

/*app.get('/',(req,res)=>{
    res.send('hola')
})*/
app.use('/Alumnos',routeEstudiante)
app.use('/Materias',routeMaterias)
app.use('/MaterialClase',routerMaterial)
app.use('/Profesores',routerProfesor)
app.use('/Login',routeLogin)
app.use('/Foro',routerPosts)
app.use('/Horario', routerHorario)
app.use('/Comments', routerComment)

app.listen(port, console.log('Running'))