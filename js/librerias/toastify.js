function emergentToastify() {
    Toastify({
        text: `Item actualizado`,
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
    }).showToast();
}