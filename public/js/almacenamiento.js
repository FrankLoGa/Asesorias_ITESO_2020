
//--------------CARGA DE DATOS-------------//
//localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0MjI2IiwiaWF0IjoxNTg1MTU1NTgyfQ.3dgYG8jNmZoNUsZHJ5ViC4vHZmTO7XQMZ4cIKKfBfF8";
function loadJSON(urlJSON, cbOK, cbErr) {
        // 1. Crear XMLHttpRequest object  
        let xhr = new XMLHttpRequest();
        // 2. Configurar: PUT actualizar archivo
        xhr.open('GET', urlJSON);
        // 4. Enviar solicitud
        xhr.send();
        // 5. Una vez recibida la respuesta del servidor
        xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
        // Ocurrió un error
        cbErr();
        alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        // ejecutar algo si error
        } else {
        let datos = JSON.parse(xhr.response); //esta es la línea que hay que proba
        // Ejecutar algo si todo está correcto
        cbOK(datos);

        }
        };
    
    }
    
///------------------GUARDAR DATOS----------------////
//se debe mandar siempre todo el arreglo de alumnos
//porque reemplaza el anterior archivo por el nuevo
function guardarEnJSON(datos, url, cbOK, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("x-auth", localStorage.token);
    // 4. Enviar solicitud al servidor
    xhr.send([JSON.stringify(datos)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            cbErr();
            
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
            cbOK();
            
        }
    };
}
    


///Listener


