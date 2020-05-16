let inicioLeft = document.getElementById('inidioID');
let token = localStorage.token


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

let viewUser = window.localStorage.vistaProfesor;
let urlVista = (window.localStorage.usuario == 'Profesor') ? ' http://localhost:3000/Alumnos' : ' http://localhost:3000/Profesores'

let userDeploy;
fetch(urlVista,{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        "x-auth": token
    }
}).then(response => response.json())
.then(function(jsonAlumnos){
    let userDep = jsonAlumnos.filter(e=> e.nombre == viewUser)
    console.log(jsonAlumnos);
    userDeploy = userDep[0];
    console.log(userDeploy);

    let doc = document.getElementById('bajasID');
    if(window.localStorage.usuario != 'Profesor'){
        doc.innerHTML = ``
    }

    let h5 = document.getElementById('h5');
    h5.innerHTML = `${userDeploy.nombre} ${userDeploy.apellido} `

    let h6 = document.getElementById('h6');
    h6.innerHTML = `${userDeploy.carrera}`

})

let informacion = document.getElementById('informacionID')
informacion.addEventListener('click',function(e){
    e.preventDefault();

    let insert_onDiv = document.getElementById('home');
    insert_onDiv.innerHTML = ""
    
    

    let userInfoDiv = document.createElement('div')
    userInfoDiv.setAttribute("class", "row")
    
    let htmlCorreos = document.createElement('p');
    // htmlCorreos.setAttribute("class", "col-md-6")

    htmlCorreos.innerHTML = ``;
    htmlCorreos.innerHTML =  `<p>${userDeploy.correo}</p>`   
    
    console.log(htmlCorreos);

    let htmlCarreras = document.createElement('p');
    // htmlCarreras.setAttribute("class", "col-md-6")
    htmlCarreras.innerHTML = ``

    
    htmlCarreras.innerHTML = `<p>${userDeploy.carrera}</p>`    
    

    console.log(htmlCarreras);

    userInfoDiv.innerHTML = ` 
    <div class="col-md-6">
        <label>Nombre</label>
    </div>
    <div class="col-md-6">
        <p>${userDeploy.nombre} ${userDeploy.apellido}</p>
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
        <label>Email</label>
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

let mensaje = document.getElementById('mensajeID')
mensaje.addEventListener('click',function(e){
        e.preventDefault();
    
        let insertDiv = document.getElementById('home');
        // console.log(insert_onDiv);
        insertDiv.innerHTML = ""
    
        let userInfoDiv2 = document.createElement('div');
    
        userInfoDiv2.innerHTML = `<div class="container">
                                    <div class="row">
                                        <h3>Enviar mensaje</h3>
                                    </div>
        
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="widget-area no-padding blank">
                                                <div class="status-upload">
                                                    <form>
                                                        <textarea placeholder="Texto" ></textarea>
                                                        <ul>
                                                            <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
                                                        </ul>
                                                        <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i> Enviar</button>
                                                    </form>
                                                </div><!-- Status Upload  -->
                                            </div><!-- Widget Area -->
                                        </div>
                                    </div>
                                </div>`
            // insertDiv.removeChild(insertDiv.firstChild);
            // insertDiv.appendChild(userInfoDiv2);
            insertDiv.innerHTML = userInfoDiv2.innerHTML;
            console.log(insertDiv);    
    })

    let idBajaMateria;
    let urlMateria = "/Materias"
    fetch(urlMateria, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "x-auth": token
        }
    }).then(response => response.json())
      .then(function(jsonAlumnos){
          let mat = jsonAlumnos.filter(f => f.nombre == window.localStorage.materia)
          idBajaMateria = mat[0].uid;
    })

    let baja = document.getElementById('daBajaID');
    baja.addEventListener('click', function(e){
        e.preventDefault();
        
        console.log(window.localStorage.materia);
        let urlDel =  '/Alumnos' + '/' + userDeploy.uid;
        let darDeBaja = JSON.stringify({uidMat: idBajaMateria, uidAl:userDeploy.uid})

        fetch(urlDel, {
            method: 'PUT',
            body: [darDeBaja],
            headers: {
                "Content-Type" : "application/json",
                "x-auth": token
            }
        })
        .then(response => {
            window.location.href = './ClasesProfesor.html'
            alert('Alumno Dado de Baja')
        })
        .catch(error => console.log(error))

        let datos = JSON.stringify({uidMat: idBajaMateria, uidAl: userDeploy.uid})
        fetch(urlMateria+'/'+idBajaMateria,{
            method: 'PUT',
            body: [datos] ,
            headers: {
                "Content-Type" : "application/json",
                "x-auth": token
            }
        })
        .then(response => console.log(response.status))
        .catch(error => console.log(error))        
    })

    let cerrarSesion = document.getElementById("cerrarSesion")

    cerrarSesion.addEventListener('click', function(e){
        localStorage.token = ""
        window.location.href = "./index.html"
    })