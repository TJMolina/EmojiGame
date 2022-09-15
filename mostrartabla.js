let table = document.getElementById('tabla');//para su posicion
let boton = document.getElementById('mostrar');
let oculta = true;

boton.addEventListener('click',mostrarTabla);

function mostrarTabla(){
    if(oculta){
        oculta=false;
        boton.style.left = "100%";
        table.style.left = "0px";
    }else{
        oculta=true;
        boton.style.left = "0px";
        table.style.left ="-100%";
    }
}

