let cerrarSesion = document.getElementById("cerrarSesion")


cerrarSesion.addEventListener('click', function(e){
    localStorage.token = ""
    window.location.href = "./index.html"
})

let classID = document.getElementById("classID");

classID.addEventListener('click',function(e){
    window.location.href = "./ClaseP.html"
})
