function comprobar(tiem)
{
    console.log('Entro a la funcion comprobar');
    let form = document.createElement('form');
    form.method = 'POST';
    form.innerHTML = `
    <input name="tiempo" value="${tiem}">
    `;
    const enviar = new FormData(form);
    fetch('https://tablaemoji.000webhostapp.com/datos.php',{//enviar datos al php
        method: 'POST',
        body: enviar
    })
    .then(res=>res.json())//recise la respuesta en json
    .then(data =>{
    console.log('Envio datos exitosamente, creo');
        let gano = 0;
        let i = 0;
        do{
    console.log('Comprobando record');
            let aux = data[i];
            if(tiem<aux[2]){
                gano = 1;
                i=10;
            }
            else i++;
        }while(i<10);
        if(gano==1)
        {
    console.log('Gano');
            ofrecer(tiem);
        }
        });
}

function ofrecer(tiem)
{
    swal("Ha superado un record!!: Quieres registrarlo? Si/No", {
        content: "input",
        })
        .then((value) => 
        {
            if(value=='Si'||value=='sI'||value=='SI'||value=='si'||value=='S'||value=='s')
            {
                actualizar(tiem);
            }else{rechazo()};
        })
}

function rechazo()
{
    swal('Has rechazado subir los datos','error');
}

function actualizar(tiem)
{
        swal("User name:", {
            content: "input",
            })
            .then((value) => {
                declararNombre(value);
                });
                
            
            function declararNombre(nom)
            {
                let form = document.createElement('form');
                form.method = 'POST';
                form.innerHTML = `
                <input name="usuario" value="${nom}">
                <input name="tiempo" value="${tiem}">
                `;
                //document.body.append(form);
                const enviar = new FormData(form);
                    fetch('https://tablaemoji.000webhostapp.com/cambiarData.php',{
                        method: 'POST',
                        body: enviar
                    })
                    .then(res=>res.json())
                    .then(data =>{
                        if(data){
                            swal("Okey!","Datos subidos exitosamente.",'success');
                        }else{
                            swal("Error!","Operación cancelada. :(",'success');
                        }

                        })
            }
}
