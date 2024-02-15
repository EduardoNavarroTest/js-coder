function emergentToastify() {
    Toastify({
        text: `Vehiculo agregado`,
        duration: 2000,
        close: true,
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
    }).showToast();
}