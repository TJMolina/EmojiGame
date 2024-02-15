import swal from "sweetalert";
const OnlineAction = {
  comprobar: async (tiem) => {
    let leGanoA = 0;
    const apiResponse = await fetch(
      process.env.NEXT_PUBLIC_BASE_LOCAL_PATH + "datos.php"
    );
    const apiRankers = await apiResponse.json();
    let logroSuperarUnRecord = false;
    for (let i = 9; i >= 0; i--) {
      if (tiem < apiRankers[i].time) {
        leGanoA = i;
        logroSuperarUnRecord = true;
      }
    }
    if (logroSuperarUnRecord === true) {
      OnlineAction.actualizar(apiRankers, leGanoA, tiem); // Updated to use OnlineAction.actualizar
    }
  },

  actualizar: async (rankers, leGanoA, tiem) => {
    const swalResponse = await swal("Ha superado un record!!, User name:", {
      content: "input",
    });
    if (swalResponse !== "") {
      rankers.splice(leGanoA, 0, {
        position: leGanoA + 1,
        name: swalResponse,
        time: tiem,
      });
      rankers.pop();
      try {
          console.log(rankers);
        rankers.forEach((ranker) => {
          fetch(process.env.NEXT_PUBLIC_BASE_LOCAL_PATH + "cambiarData.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ranker),
          })
            .then(async (res) => {
              if (res.ok) {
                console.log(res);
              } else {
                const response = await res.json();
                console.log(response);
              }
            })
            .catch((e) => console.log(e));
        });
        swal("Okey!", "Datos subidos exitosamente.", "success");
      } catch (e) {
        console.log(e);
        swal("Error!", "Operación cancelada. :(", "error");
      }
    }
  },
};
export { OnlineAction };
