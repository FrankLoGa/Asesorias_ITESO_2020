

let url = "/Materias";
let urlPost = "/Foro";
let token = localStorage.token;
let urlUser = (window.localStorage.usuario == 'Profesor') ? '/Profesores' : '/Alumnos'
//Arreglo de materias
let alumnoID =0;
let materiasO =[]
let materiasF = [];
/*let testReq = {
    
    "id":2,
    "title":"Pregunta",
    "author":"pepe perez"
    }
*/
    loadJSON(url, succes, error);

  


 function succes(data){
     console.log("YAII");
     let arrTemp = JSON.stringify(data);
     materiasO = JSON.parse(arrTemp);
     console.log(materiasO);

     fetch(urlUser+'/'+localStorage.correo,{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            'x-auth': token
        }
    }).then(response => response.json() )
    .then(function(jsonUser){
        alumnoID = jsonUser.uid;


        materiasO.forEach(element => {
            console.log(element.alumnos + element.nombre);
            if(element.alumnos == alumnoID){
                console.log("HOla");
                materiasF.push(element);
            }
            console.log(materiasF);
    });

            materia_title.innerHTML = materiasF.map(element=>`<div>
            <a href="Materia.html" style="text-decoration:none"><li><h5>${element.nombre}</h5></li></a>
                </div>`
        ).join("");

      
    });
        
   
    

}
 function error(){
     console.log("Oops!! something went wrong");
 }
 

 function postTest(){
    guardarEnJSON(testReq ,urlPost, Ssucces, Serror);
 }

function Ssucces(){
   console.log("Usuario creado Correctamente");
   return true;
}

function Serror(){
        console.log("ERROR el usuario no pudo ser guardado");
    }