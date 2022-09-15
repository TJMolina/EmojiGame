let records;
let aQuien;
function comprobar(tiem)
{
    let form = document.createElement('form');
    form.method = 'POST';
    form.innerHTML = `<input name="tiempo" value="${tiem}">`;
    const enviar = new FormData(form);
    fetch('https://tablaemoji.000webhostapp.com/datos.php',{
        method: 'POST',
        body: enviar
    })
    .then(res=>res.json())//recise la respuesta en json
    .then(data =>{
        records = data;
        let gano = 0;
        let i = 0;
        do{
            let aux = data[i];
            if(tiem<aux[2]){
                aQuien = i;
                gano = 1;
                i=10;
            }
            else i++;
        }while(i<10);
        if(gano==1)
        {
            actualizar(tiem);
        }
        });
}

function actualizar(tiem)
{
        swal("Ha superado un record!!, User name:",
        {
        content: "input",
        })
        .then((value) => 
        {
            if(value!='')
            {
                declararNombre(value);
            }
            else swal("Error","Fallo en el registro","error");
        });
            

        function declararNombre(nom)
        {
            records.splice(aQuien,0,[aQuien+1,nombre.value,record.value]);
            records.pop();
            let i = 0;
            records.forEach(element => 
            {
                if(i>=aQuien)
                {
                    element[0] = i+1;
                }
                i++;
            });
                
            records.forEach(esto=>
            {
            let form = document.createElement('form');
            form.method = 'POST';
            let aEnvair = JSON.stringify(esto);//document.body.append(form);
            form.innerHTML = `<input name="data" value="${esto}">`;
            const enviar = new FormData(form);
            fetch('https://tablaemoji.000webhostapp.com/cambiarData.php',
            {//enviar datos al php
                method: 'POST',
                body: enviar
            })
            .then(res=>res.json())//recise la respuesta en json
            .then(dat =>
            {
                if(dat)
                {
                    swal("Okey!","Datos subidos exitosamente.",'success');
                }else
                {
                    swal("Error!","Operación cancelada. :(",'success');
                }
            })
            })
        }     
}
