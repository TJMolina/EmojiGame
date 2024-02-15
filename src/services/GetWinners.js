const Winners = {
    getWinnersTable(table){
        fetch(process.env.NEXT_PUBLIC_BASE_LOCAL_PATH + 'getUsers.php')
        .then(res=>res.json())
        .then(data =>{
            table.innerHTML = ""
            data.forEach(user => {
                table.innerHTML+=(`
                <tr>
                    <td>${user.position}</td>
                    <td>${user.name}</td>
                    <td>${user.time}</td>
                </tr>
                `)}
            );
        })
        .catch(e=>{
            console.log(e);
        });
    }
}
export {Winners}