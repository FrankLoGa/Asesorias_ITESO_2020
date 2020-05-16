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