let url = "/Horario";
let urlPost = "/Foro";
//Arreglo de materias
let horarios =[]
let horariosF = [];


    loadJSON(url, succes, error);

 
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
        
   
    myTable.innerHTML = horariosF.map(element=>`<tr>
                                                 <td>${element.Nombre}</td>
                                                 <td>${element.Dias}</td>
                                                 <td>${element.Hora}</td>
                                                 <td>${element.Salon}</td>
                                                </tr>`
     ).join("");
}
 function error(){
     console.log("Oops!! something went wrong");
 }