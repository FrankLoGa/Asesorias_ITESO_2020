let urlMaterial = '/MaterialClase'
let materiaDesplegar = window.localStorage.materia;
let token = localStorage.token;
let material;
let jsonMat;

//variable para saber nombre y id de la materia del obj materia del json
let mat;

fetch('/Materias',{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        "x-auth": token
    }
}).then(response => response.json())

.then(function(jsonMateria){
    //se obtiene el material seleccionado
    console.log("entro");
    //revisar que materia tiene el mismo id
    for (let i = 0; i < jsonMateria.length; i++) {
        if(jsonMateria[i].nombre == materiaDesplegar){
            mat = jsonMateria[i];
        }
    }
})

fetch(urlMaterial,{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        "x-auth": token
    }
}).then(response => response.json())
.then(function(jsonMaterial){
    //se obtiene el material seleccionado
    
    
    //ya teniendo el id en mat y el nombre se debe buscar en la urlMaterial
    for (let x = 0; x < jsonMaterial.length; x++) {
        console.log({jsonMaterial: jsonMaterial});
        console.log({mat:mat});
        if(jsonMaterial[x].materia == mat.uid){
            material = jsonMaterial[x];
            console.log({material: material});
        }
        
    }

    //los archivos a desplegar
    console.log({materialPrueba:material});

    //desplegar la info correspondiente de la materia
    let h1 = document.getElementById('h1')
    h1.innerHTML = `${mat.nombre}`

    //imprimir la lista de referencias de consulta
    let referencias = document.getElementById('listaConsulta')
    let listMaterial = document.createElement('li')

    console.log({PruebaFile: material});
    for (let m = 0; m < material.file.length; m++) {
        listMaterial.innerHTML += 
        `<a href="${material.fileUrl[m]}" target="_blank"><h6>${material.file[m]}</h6></a>
        <button id="trash1" onClick="removeFiles('${material.file[m]}','${material.fileUrl[m]}')"><i class="fa fa-trash"></i></button>`        
    }

    referencias.innerHTML = listMaterial.innerHTML
    referencias.innerHTML += `
    <br><br>
    <button type="button" class="btn btn-lg" data-toggle="modal" data-target="#modelId"><b>Subir Material de Consulta</b></button>`

})
//remueve los archivos subidos en caso de presionar el boton 
function removeFiles(file, urlfile){
    let newfile = material.file.filter(f => f != file)
    let newurlfile = material.fileUrl.filter(uf => uf != urlfile)

    let newMaterial ={
        id: material.uid,
        materia: material.materia,
        profesor: material.profesor,
        file: newfile,
        fileUrl: newurlfile
    }

    let jsonMaterial = JSON.stringify(newMaterial)
    let datos = JSON.stringify({fileUrl:urlfile,file:file})
    let urlMaterialPut = urlMaterial + "/removemat/" + material.uid
    console.log({materialUid:material.uid});
    //se hace metodo put para actualizar los cambios
    fetch(urlMaterialPut,{
        method: 'PUT',
        body: [datos],
        headers: {
            "Content-Type" : "application/json",
            "x-auth": token
        }
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error))

    window.location.href = window.location.href;
}

//se hace un submit de nuevos archivos al material de consulta
let submitFile = document.getElementById('submitFile')
submitFile.addEventListener('click', function(e){
    // e.preventDefault();
    
    let titulo = document.getElementById('nombre').value;
    let link = document.getElementById('link').value;

    
    let arrFile = material.file;
    let arrFileUrl = material.fileUrl;

    arrFile.push(titulo);
    arrFileUrl.push(link);

    let usr = {
        id: material.uid,
        materia: material.materia,
        profesor: material.profesor,
        file: arrFile,
        fileUrl: arrFileUrl
    }

    console.log(usr);
    let jsonMate = JSON.stringify(usr)
    let datos = JSON.stringify({fileUrl:link,file:titulo})
    let urlMaterialUpload = urlMaterial + "/" + material.uid
    //se hace metodo put para actualizar los cambios
    fetch(urlMaterialUpload,{
        method: 'PUT',
        body: [datos],
        headers: {
            "Content-Type" : "application/json",
            "x-auth": token
        }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))

    window.location.href = window.location.href;

})

let alumnos = document.getElementById("alumnosID");
let al;

fetch('/Alumnos',{
    method: "GET",
    headers: {
        "Content-Type" : "application/json",
        "x-auth": token
    }
}).then(response => response.json())
.then(function(jsonAlumnos){
    al = jsonAlumnos
})

alumnos.addEventListener('click', function(e){
    e.preventDefault(e);

    let menu3 = document.getElementById('menu3');
    console.log(al);
    let olAlumnos = document.createElement('ol');
    console.log(al[0].nombre);
    for (let a = 0; a < mat.alumnos.length; a++) {
        console.log('Primer for');
        for (let ia = 0; ia < al.length; ia++) {
            console.log('Segundo for');
            if(mat.alumnos[a] == al[ia].uid){
                console.log('if');
                console.log({al: al});
                olAlumnos.innerHTML += `<li><a onClick="revisaUsuario('${al[ia].nombre}')" href="Vista_Profe.html">${al[ia].nombre} ${al[ia].apellido}</a></li>`
            }   
        }
    }

    menu3.innerHTML = `<ol>${olAlumnos.innerHTML}</ol>`
})

//se guarda en una variable para revisar en el otro .js
function revisaUsuario(usuario){
    window.localStorage.setItem('vistaProfesor', usuario);
}

let inicioLeft = document.getElementById('inidioID');

inicioLeft.addEventListener('click', function(e){
    e.preventDefault();
    if(window.localStorage.usuario == 'Profesor'){
        window.location.href = './LoggedProfessor.html'
    }else{
        window.location.href = './LoggedUser.html'
    }
})


let inicioiRight = document.getElementById('inicioRight');

inicioiRight.addEventListener('click', function(e){
    e.preventDefault();
    if(window.localStorage.usuario == 'Profesor'){
        window.location.href = './LoggedProfessor.html'
    }else{
        window.location.href = './LoggedUser.html'
    }
})


let cerrarSesion = document.getElementById("cerrarSesion")

cerrarSesion.addEventListener('click', function(e){
    localStorage.token = ""
    window.location.href = "./index.html"
})