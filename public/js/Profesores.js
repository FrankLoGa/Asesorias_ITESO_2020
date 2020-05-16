let urlP = "/Profesores";
//Arreglo de materias
let profesores =[]
let profesoresF = [];


    loadJSON(urlP, succes, error);

 
 function succes(data){
     console.log("YAII");
     let arrTemp = JSON.stringify(data);
     profesores = JSON.parse(arrTemp);
     console.log(profesores);
     profesores.forEach(element => {
        if(element.materias == 1){
            profesoresF.push(element);
        }
    });
        
   
    menu3.innerHTML = profesoresF.map(element=>`<li><a href="Vista_Profe.html">${element.Nombre} ${element.apellidos}</a></li>`
     ).join("");
}
 function error(){
     console.log("Oops!! something went wrong");
 }