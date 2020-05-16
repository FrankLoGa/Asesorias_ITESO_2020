let urlConsultaAl = "/Alumnos";
let urlConsultaProf = "/Profesores";
let urlTkn = "/Login";
let RegisteredUsers= [];
let ingresar = document.getElementById('UserIngresar')

// fetch(urlConsulta,{
//     method: 'GET',
//     header: {
//         "Content-Type" : "application/json"
//     }
// }).then(response => response.json())
// .then(function(jsonUsers){
//     RegisteredUsers = jsonUsers;
// })
let token;
ingresar.addEventListener('click', function(e){
    e.preventDefault();
    console.log("entro");
    let correo = document.getElementById('LogEmail').value
    let pwd = document.getElementById('passwd').value

    let jsonLog = JSON.stringify({correo: correo, password: pwd});
    fetch(urlTkn,{
        method: 'POST',
        body: [jsonLog],
        headers:{
            "Content-Type": "application/json" 
        }
    }).then(response => response.json())
    .then(function(response){
        console.log(response);
        
        localStorage.token = response.token;
        localStorage.usuario = response.usuario;
        localStorage.correo = response.correo;

        if(response){
            if(localStorage.usuario == "Profesor"){
                //redirecciona a la pagina de profes
                window.location.href = "./LoggedProfessor.html"
            }else{
                //redirecciona a la pagina de Estudiante
                window.location.href = "./LoggedUser.html"
            }
        }else{
            alert(response.status + " Credenciales invalidas")
        }
    })
})

