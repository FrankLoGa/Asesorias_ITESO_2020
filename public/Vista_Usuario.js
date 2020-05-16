let informacion = document.getElementById('informacionID');
let mensaje = document.getElementById('mensajeID');

let urlUser = (window.localStorage.usuario == 'Profesor') ? '/Profesores' : '/Alumnos'
let token = localStorage.token;
let correoUsuario = localStorage.correo;
let userDeploy;

let materias;

fetch('/Materias',{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        'x-auth': token
    }
}).then(response => response.json())
.then(function(jsonMaterias){    
    materias = jsonMaterias;
})

fetch(urlUser+"/"+correoUsuario,{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        'x-auth': token
    }
}).then(response => response.json())
.then(function(jsonUsers){
    //selecciona el usuario que ingreso
    console.log(jsonUsers);
    userDeploy = jsonUsers;

    let initNombre = document.getElementById('h5');
    let initCarrera = document.getElementById('h6');
    let idAsesorias = document.getElementById('idAsesorias');
    let profileImg = document.getElementById('profileImg');

    initNombre.innerHTML = `<h5>${userDeploy.nombre} ${userDeploy.apellidos}</h5>`
    initCarrera.innerHTML = `<a href="#" data-target="#modelEliminar" data-toggle="modal">${userDeploy.carrera} </a>`

    if(window.localStorage.usuario == 'Profesor'){
        idAsesorias.innerHTML = `<p>Asesorias impartidas</p>`
        // `<a href="ClasesProfesor.html">${materias[0].nombre}</a><br/>`        
    }else{
        idAsesorias.innerHTML = `<p>Asesorias </p>`
            // `<a href="ClasesProfesor.html">${materias.nombre}</a><br/>`
    }

    //imprime todas las materias a las que el usuario esta inscrito en las asesorias
    if(localStorage.usuario == 'Profesor'){ 
    for (let x = 0; x < materias.length; x++) {
        for (let c = 0; c< userDeploy.materias.length; c++) { 
          if(materias[x].uid == userDeploy.materias[c]){
              idAsesorias.innerHTML += `
                <a onClick="referenciaMateria('${materias[x].nombre}')" href="ClasesProfesor.html">${materias[x].nombre}</a>
                <a onClick="eliminaAsesoria('${materias[x].nombre}')"><i class="fa fa-times-circle"></i></a>
                <br/>`
          }  
        }
    }
  }else{
    for (let x = 0; x < materias.length; x++) {
        for (let c = 0; c< userDeploy.Materias.length; c++) { 
          if(materias[x].uid == userDeploy.Materias[c]){
              idAsesorias.innerHTML += `
                <a onClick="referenciaMateria('${materias[x].nombre}')" href="ClasesProfesor.html">${materias[x].nombre}</a>
                <a onClick="eliminaAsesoria('${materias[x].nombre}')"><i class="fa fa-times-circle"></i></a>
                <br/>`
          }  
        }
    
    }  

    profileImg.innerHTML = `                          
    <div class="profile-img">
        <img id="profileImg" src="${userDeploy.url}" alt=""/>
    </div>`
    }
});


informacion.addEventListener('click',function(e){
    e.preventDefault();

    let insert_onDiv = document.getElementById('home');
    insert_onDiv.innerHTML = ""
    
    

    let userInfoDiv = document.createElement('div')
    userInfoDiv.setAttribute("class", "row")
    
    let htmlCorreos = document.createElement('p');
    // htmlCorreos.setAttribute("class", "col-md-6")

    htmlCorreos.innerHTML = ``;
    if(localStorage.usuario == 'Profesor'){
    for (let u = 0; u < userDeploy.correoAd.length; u++) {
        htmlCorreos.innerHTML +=  `<p>${userDeploy.correoAd[u]}</p>`   
    }
    }else{
        htmlCorreos.innerHTML +=  `<p>${userDeploy.correo}</p>`
    }
    console.log(htmlCorreos);

    let htmlCarreras = document.createElement('p');
    // htmlCarreras.setAttribute("class", "col-md-6")
    htmlCarreras.innerHTML = ``

    if(localStorage.usuario == 'Profesor'){
    for (let i = 0; i < userDeploy.carrera.length; i++) {
        htmlCarreras.innerHTML += `<p>${userDeploy.carrera[i]}</p>`    
    }
    }else{
        htmlCarreras.innerHTML += `<p>${userDeploy.carrera}</p>`
    }

    console.log(htmlCarreras);

    userInfoDiv.innerHTML = ` 
    <div class="col-md-6">
        <label>Nombre</label>
    </div>
    <div class="col-md-6">
        <p>${userDeploy.nombre} ${userDeploy.apellidos}</p>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <label>Carrera</label>
    </div>
    <div class="col-md-6">
   ${htmlCarreras.innerHTML}
   </div>
</div>
<div class="row">
    <div class="col-md-6">
        <label>Email Institucional</label>
    </div>
    <div class="col-md-6">
        <p>${userDeploy.correo}</p>

    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <label>Email Adicional</label>
    </div>
    <div class="col-md-6">
        ${htmlCorreos.innerHTML}
    </div>
</div>
<label>Descripcion</label>
        <p>${userDeploy.descripcion}</p>
         `

    
// insert_onDiv.appendChild(userInfoDiv)
//insert_onDiv.removeChild(insert_onDiv.firstChild)
insert_onDiv.innerHTML = userInfoDiv.innerHTML
console.log(insert_onDiv);
})

// mensaje.addEventListener('click',function(e){
//     e.preventDefault();

//     let insertDiv = document.getElementById('home');
//     // console.log(insert_onDiv);
//     insertDiv.innerHTML = ""

//     let userInfoDiv2 = document.createElement('div');

//     userInfoDiv2.innerHTML = `<div class="container">
//                                 <div class="row">
//                                     <h3>Enviar mensaje</h3>
//                                 </div>
    
//                                 <div class="row">
//                                     <div class="col-md-6">
//                                         <div class="widget-area no-padding blank">
//                                             <div class="status-upload">
//                                                 <form>
//                                                     <textarea placeholder="Texto" ></textarea>
//                                                     <ul>
//                                                         <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
//                                                     </ul>
//                                                     <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i> Enviar</button>
//                                                 </form>
//                                             </div><!-- Status Upload  -->
//                                         </div><!-- Widget Area -->
//                                     </div>
//                                 </div>
//                             </div>`
//         // insertDiv.removeChild(insertDiv.firstChild);
//         // insertDiv.appendChild(userInfoDiv2);
//         insertDiv.innerHTML = userInfoDiv2.innerHTML;
//         console.log(insertDiv);    
// })

//Edicion del usuario
let editProfile = document.getElementById('EdtProfileID')

// let idout;
editProfile.addEventListener('click', function(e){
    
    let nombreCompleto = document.getElementById('nombre').value;
    let nombreEdt;
    let appEdit;
    let correo = document.getElementById('email').value
    let carrera = document.getElementById('titulo').value;
    let conocimientos = document.getElementById('conocimiento').value;
    let descripcion = document.getElementById('describeID').value;
    let urlID = document.getElementById('urlID').value;

    if(nombreCompleto == ""){
        nombreEdt = userDeploy.nombre;
        appEdit = userDeploy.apellidos;
    }else{
        let nm = nombreCompleto.split(' ');
        nombreEdt = nm[0]
        appEdit = nm[1]
    }

    //arreglo de correos para el objeto
    let arrCorreos = [];
    if(correo == ""){
        arrCorreos = userDeploy.correoAd;
    }else{
        arrCorreos = userDeploy.correoAd;
        arrCorreos.push(correo)
    }

    //arreglo para las carreras del objeto
    let arrCarreras = userDeploy.carrera;

    if(carrera != ""){
        arrCarreras.push(carrera)
    }

    //arreglo para las materias del objeto
    let arrMaterias = userDeploy.materias;
    // let arrMaterias = []
    console.log(conocimientos);
    //en este caso las materias se reciben como String, pero el arreglo es numerico
    if(conocimientos != ""){
        let id = materias.filter(m=> m.nombre == conocimientos)
        
        // console.log(idout);
        arrMaterias.push(id[0].uid);
    
        // for (let d = 0; d < materias.length; d++) {
        //     console.log(materias[d].nombre);
        //     //se sabe que en el sistema ya estan de alta todas las materias, aqui no se ingresan nuevas materias
        //     console.log("for entrooo");
        //     if(materias[d].nombre.toUppercase == conocimientos.toUppercase){
        //        arrMaterias.push(materias[d].uid);
               
        //     }
        // }
    } 
    
    console.log({arrMaterias: arrMaterias});
    if(descripcion == "") userDeploy.descripcion = descripcion;
    urlID = (urlID == "") ? userDeploy.url : urlID;

    let edtObjUser = {
        uid: userDeploy.uid,
        nombre: nombreEdt,
        apellidos: appEdit,
        correo: userDeploy.correo,
        correoAd: arrCorreos,
        carrera: userDeploy.carrera,
        materias: arrMaterias,
        descripcion: descripcion,
        url: urlID,
        horario: userDeploy.horario
    }

    let urlUserEdt;
    if(localStorage.usuario == 'Profesor'){
        urlUserEdt = urlUser+"/"+userDeploy.uid;
    }else{
        urlUserEdt = urlUser+'/update/'+userDeploy.uid;
    }
    console.log(edtObjUser);
    let jsonEdt = JSON.stringify(edtObjUser);
    // let datos = JSON.stringify({uid:userDeploy.uid, profesor:edtObjUser})
    fetch(urlUserEdt,{
        method: 'PUT',
        body: [jsonEdt],
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error))

    window.location.href = window.location.href;
})

//eliminar carreras 
// let modal = document.getElementById("confirmId")
// let eliminaCarrera;

// $(`#modelEliminar`).on(`shown.bs.modal`, function(e){
//     let eliminaModal = document.getElementById("listaCarreras")
//     eliminaModal.innerHTML = ``;

//     for (let c = 0; c < userDeploy.carrera.length; c++) {
//         eliminaModal.innerHTML += `
//             <p>${userDeploy.carrera[c]}`
//             //<a onClick="eliminarCarrera('${userDeploy.carrera[c]}')"><i class="fa fa-times-circle"></i></a></p>
              
//     }
// })


// modal.addEventListener('click',function(e){
//     e.preventDefault();
    
//     //Se escogio una carrera a eliminar
//     if(eliminaCarrera){
//         let arrCarr = userDeploy.carrera.filter(e=> e != eliminaCarrera);

//         let nwUsr = {
//             id: userDeploy.id,
//             Nombre: userDeploy.Nombre,
//             apellidos: userDeploy.apellidos,
//             correo: userDeploy.correo,
//             carrera: arrCarr,
//             materias: userDeploy.materias,
//             descripcion: userDeploy.descripcion,
//             url: userDeploy.url,
//             Horario: userDeploy.Horario
//         }
        
//         let jsonEdt = JSON.stringify(nwUsr);
//         let urlUserEdt = urlUser+"/"+userDeploy.id;
//         fetch(urlUserEdt,{
//             method: 'PUT',
//             body: [jsonEdt],
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-auth': token
//             }
//         })
//         .then(response => console.log(response.status))
//         .catch(error => console.log(error))
//     }

// })

// function eliminarCarrera(elCarrera){
//     eliminaCarrera = elCarrera;
// }

function eliminaAsesoria(materiaRemover){
    let intMateria = materias.filter(e=> e.nombre == materiaRemover)
    let remov = userDeploy.materias.filter(e=> e!= intMateria[0].uid);
    // console.log(remov);
    let nwUsr = {
        uid: userDeploy.uid,
        Nombre: userDeploy.nombre,
        apellidos: userDeploy.apellidos,
        correo: userDeploy.correo,
        carrera: userDeploy.carrera,
        materias: remov,
        descripcion: userDeploy.descripcion,
        url: userDeploy.url,
        Horario: userDeploy.Horario
    }

    let jsonEdt = JSON.stringify(nwUsr);
    let datos = JSON.stringify({uid:userDeploy.uid,materia:intMateria[0].uid})
    let urlUserEdt = urlUser+"/quitaAsesorias/"+userDeploy.uid;
    fetch(urlUserEdt,{
        method: 'PUT',
        body: [datos],
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error))

    window.location.href = window.location.href;
}

function referenciaMateria(mat){
    window.localStorage.setItem('materia', mat);
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