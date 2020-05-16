let urlH = "/Horario";
let urlPostm = "/Foro";
//Arreglo de materias
let horarios =[];

let horariosF = [];


    loadJSON(urlH, succes, error);

 
 function succes(data){
     console.log("YAII");
     let arrTemp = JSON.stringify(data);
     horarios = JSON.parse(arrTemp);
     console.log(horarios);
     horarios.forEach(element => {
        if(element.Materia == 1){
            horariosF.push(element);
        }
       


        
  
   
    });
}

console.log(localStorage.materia);
materiaTitle.innerHTML =`<h1 id="materiaTitle">${localStorage.materia}</h1>`;

 function error(){
     console.log("Oops!! something went wrong");
 }