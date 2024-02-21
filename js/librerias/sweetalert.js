/* Función para simular timer, recibie tiempo en milisegundos */
function alertWaitSweet(time) {
    let timerInterval;
    Swal.fire({
        title: "Espere...",
        timer: time,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    });
}

function alertSweetDelete() {
    Swal.fire({
        title: "OK",
        text: "Operación realizada exitosamente",
        icon: "success"
      });
}