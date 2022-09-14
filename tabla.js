function activarTabla()
{
    let ganadores = document.getElementById('usuarios');
    let peticion;
    fetch('https://tablaemoji.000webhostapp.com/datos.php',{
        method: 'POST',
        body: peticion
    })
    .then(res=>res.json())
    .then(data =>{
        data.forEach(element => {
            ganadores.innerHTML+=(`
            <tr>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
            </tr>
            `)
        }
        );
    })
}
