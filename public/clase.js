let token = localStorage.token;
let urlMaterias = '/Materias';
let urlUser = (window.localStorage.usuario == 'Profesor') ? '/Profesores' : '/Alumnos'

let materias;
fetch(urlMaterias,{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        'x-auth': token
    }
}).then(response => response.json())
.then(function(jsonMaterias){    
    materias = jsonMaterias;

    fetch(urlUser+'/'+localStorage.correo,{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            'x-auth': token
        }
    }).then(response => response.json())
    .then(function(jsonUsers){
        let materiasSemestre = document.getElementById('idlistMat');
        materiasSemestre.innerHTML = ``

        if(localStorage.usuario == 'Profesor'){ 
        for(let x = 0; x < materias.length; x++){
            for(let c = 0; c <jsonUsers.materias.length; c++){
                if(Number(materias[x].uid) == Number(jsonUsers.materias[c])){
                    materiasSemestre.innerHTML +=
                     `<a onClick="referenciaMateria('${materias[x].nombre}')" href="ClasesProfesor.html">
                        <li><h5>${materias[x].nombre}</h5></li>
                     </a>`
                    
                }
            }
        }
    }else{
        for(let x = 0; x < materias.length; x++){
            for(let c = 0; c <jsonUsers.Materias.length; c++){
                if(Number(materias[x].uid) == Number(jsonUsers.Materias[c])){
                    materiasSemestre.innerHTML +=
                     `<a onClick="referenciaMateria('${materias[x].nombre}')" href="Materia.html">
                        <li><h5>${materias[x].nombre}</h5></li>
                     </a>`
                    
                }
            }
    }
}
        materiasSemestre.innerHTML += `</ul>`
        console.log(materiasSemestre);
    })
})

function referenciaMateria(mat){
    window.localStorage.setItem('materia', mat);
}


let cerrarSesion = document.getElementById("cerrarSesion")


cerrarSesion.addEventListener('click', function(e){
    localStorage.token = ""
    window.location.href = "./index.html"
})