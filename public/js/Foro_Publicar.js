let urlPost = "/Foro";
let token = localStorage.token;
let urlUser = (window.localStorage.usuario == 'Profesor') ? '/Profesores' : '/Alumnos'
let urlMateria = '/Materias'


let postToSend ={
    uid: 1,
    autor:"",
    title:"",
    message:"", 
    materia:1
}
fetch(urlPost,{
    method: 'GET',
    headers: {
        "Content-Type" : "application/json",
        'x-auth': token
    }
}).then(response => response.json() )
.then(function(jsonPost){
   postToSend.uid = jsonPost.length;
   console.log(jsonPost);

});


process()
btnGuardar.addEventListener('click',postTest);

function process(){

    fetch(urlUser+'/'+localStorage.correo,{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            'x-auth': token
        }
    }).then(response => response.json() )
    .then(function(jsonUser){
        postToSend.autor = jsonUser.nombre +" "+jsonUser.apellidos;
        console.log("H");

    });

    
    fetch(urlMateria+'/'+localStorage.materia,{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            'x-auth': token
        }
    }).then(response => response.json() )
    .then(function(jsonClass){
        postToSend.Materia = jsonClass.uid;

    });
}


 function postTest(){
    

    postToSend.title = titleBox.value
    postToSend.Message = messageBox.value
    guardarEnJSON(postToSend ,urlPost, Ssucces, Serror);
    console.log(postToSend);
    window.href = '../Materia.html'
}
 

function Ssucces(){
   console.log("Usuario creado Correctamente");
   console.log(postToSend);
   return true;
}

function Serror(){
        console.log("ERROR el usuario no pudo ser guardado");
    }