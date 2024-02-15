/* Función para simular timer, recibie tiempo en milisegundos */
function intervalAlert(time) {
    let timerInterval;
    Swal.fire({
        title: "Espere...",
        //html: "I will close in <b></b> milliseconds.",
        timer: time,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                //timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
}

function alertSweetDelete() {
    Swal.fire({
        title: "¿Desea realizar esta operación?",
        text: "Esto eliminará los vehiculos agregados al carrito de compra",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "OK",
                text: "Carrito vacíado",
                icon: "success"
            });
        }
    });
}