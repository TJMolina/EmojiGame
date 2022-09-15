let table = document.getElementById('tabla');//para su posicion
let boton = document.getElementById('mostrar');
let oculta = true;

boton.addEventListener('click',mostrarTabla);

function mostrarTabla(){
    if(oculta){
        oculta=false;
        boton.style.left = "210px";
        table.style.left = "0";
    }else{
        oculta=true;
        boton.style.left = "0px";
        table.style.left ="-300";
    }
}

