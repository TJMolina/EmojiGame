import swal from "sweetalert";

const OnlineAction = {
  comprobar: async (tiem) => {
    const apiResponse = await fetch(process.env.NEXT_PUBLIC_BASE_LOCAL_PATH + "datos.php");
    const apiRankers = await apiResponse.json();
    const leGanoA = apiRankers.findIndex(ranker => tiem < ranker.time);
    if (leGanoA !== -1) {
      OnlineAction.actualizar(apiRankers, leGanoA, tiem);
    }
  },

  actualizar: async (rk, leGanoA, tiem) => {
    const rankers = [...rk];
    const swalResponse = await swal("Ha superado un record!!, User name:", { content: "input" });
    if (swalResponse !== "") {
      rankers.splice(leGanoA, 0, { position: leGanoA + 1, name: swalResponse, time: tiem });
      rankers.slice(leGanoA + 1).forEach(ranker => ranker.position += 1);
      rankers.pop();
      const rankersString = JSON.stringify(rankers);
      console.log(rankersString);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_LOCAL_PATH + "cambiarData.php", {
          method: "POST",
          body: rankersString,
        });
        if (res.ok) {
          console.log(res);
          swal("Okey!", "Datos subidos exitosamente.", "success");
        } else {
          const response = await res.json();
          console.log(response);
        }
      } catch (e) {
        console.log(e);
        swal("Error!", "Operación cancelada. :(", "error");
      }
    }
  },
};

export { OnlineAction };
