/**
 * librerias en archivos diferentes
 * ver que más se puede agregar a archivos diferntes
 * localStorage
 * otra pagina para finalizar
 * 
*/

/* Recuperar elementos del DOM */

const cardsContainer = document.querySelector("#cardsContainer");
const btnBuscar = document.querySelector("#btnSearch");
const inputVehiculos = document.querySelector("#inputAutos");
const listarCarrito = document.querySelector("#listarCarrito");
const iconCarrito = document.querySelector("#carritoIcono");
const carritoDiv = document.querySelector("#carrito");
const finalizarCarrito = document.querySelector("#btnFinalizarOperacion");
const eliminarCarrito = document.querySelector("#btnVaciarCarrito");

const carrito = new Carrito();

/* Eventos */

document.addEventListener("DOMContentLoaded", () => {
    mostrarVehiculosDisponibles();
    seleccionarVehiculo();
    mostrarIconoCarrito();
});

//document.addEventListener("DOMContentLoaded", filtrarVehiculos);
btnBuscar.addEventListener("click", mostrarVehiculosDisponibles);

inputVehiculos.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        mostrarVehiculosDisponibles();
    }
});


function seleccionarVehiculo() {
    const btnReservar = document.querySelectorAll(".reservar-btn");
    btnReservar.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const dias = 1;
            const veh = { id, dias }
            carrito.agregarVehiculo(id, dias);
            emergentToastify();
            mostrarIconoCarrito();
            guardarCarritoLScarrito(veh)
        });
    });
}

// Agregar evento de clic al icono del carrito para mostrar u ocultar los productos
iconCarrito.addEventListener('click', () => {
    toggleCarrito();
});

eliminarCarrito.addEventListener("click", () => {
    alertSweetDelete();
    carrito.vaciarCarrito();
    mostrarIconoCarrito();
    mostrarCarrito();

});


/* Funciones */

function mostrarVehiculosDisponibles() {
    const tipoVehiculo = obtenerPaginaActual()
    const cochesFiltrados = vehiculos.filter(vehiculo => {
        const { marca, modelo } = vehiculo; //Destructuración del objeto
        const nombre = marca + " " + modelo;  //Para permitir que el usuario pueda consultar por la marca y/o modelo del vehículo
        return vehiculo.tipo === tipoVehiculo
            && vehiculo.disponible === true
            && nombre.toLowerCase().includes(inputVehiculos.value.toLowerCase());
    });

    cardsVehiculos(cochesFiltrados);
}

function cardsVehiculos(vehiculosFiltrados) {
    intervalAlert(250);
    cardsContainer.innerHTML = "";

    if (vehiculosFiltrados.length > 0) {
        const cardStyleBoostrap = document.createElement("div");
        cardStyleBoostrap.classList.add("row", "row-cols-1", "row-cols-md-2", "row-cols-lg-3", "g-4");
        cardsContainer.appendChild(cardStyleBoostrap);

        vehiculosFiltrados.forEach(vehiculo => {
            const card = crearCardsVehiculos(vehiculo);
            cardStyleBoostrap.appendChild(card);
        });

    } else {
        const mensajeError = document.createElement("div");
        mensajeError.innerHTML = alertMensaje("danger", "No se encontraron vehículos con ese nombre");
        cardsContainer.appendChild(mensajeError);
    }
}


function alertMensaje(tipoAlerta, mensaje) {
    return `
    <div class="alert alert-${tipoAlerta}" role="alert">
        ${mensaje}
    </div>
    `;
}

function crearCardsVehiculos(vehiculo) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="col mb-4">
        <div class="card h-100">
            <img src="${vehiculo.imagen}" class="card-img-top" alt="${vehiculo.marca}">
            <div class="card-body">
                <h5 class="card-title text-center">${vehiculo.marca} ${vehiculo.modelo}</h5>
                <p>Este vehículo puede ser tuyo los días que desees, puedes llevarlo por la suma de: ${vehiculo.precio}
                 USD por día</p>
                <p class="text-center">${vehiculo.descripcion}</p>
                <button class="btn btn-primary reservar-btn" data-id="${vehiculo.id}">Reservar Ahora</button>
            </div>
        </div>
    </div>
    `;

    return card;
}

function mostrarIconoCarrito() {
    //Solo muestra el icono del carrito si hay vehiculos agregados
    iconCarrito.style.display = carrito.vehiculos.length === 0 ? "none" : "block";
}

function vaciarCarrito() {
    carrito.vaciarCarrito();
    mostrarIconoCarrito();
}

function toggleCarrito() {
    // Si el carrito está visible, ocúltalo; de lo contrario, muéstralo
    if (carritoDiv.style.display === 'block') {
        carritoDiv.style.display = 'none';
    } else {
        mostrarCarrito();
    }
}



function mostrarCarrito() {

    listarCarrito.innerHTML = '';

    carrito.vehiculos.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.id} - ${item.precio}`;
        listarCarrito.appendChild(li);
    });
    // Muestra el carrito si hay vehículos seleccionados
    if (carrito.vehiculos.length > 0) {
        document.getElementById('carrito').style.display = 'block';
    } else {
        document.getElementById('carrito').style.display = 'none';
    }
}






/* Función de SweetAlert2 para simular timer  */
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

/* Función para recuperar la página actual logueada*/
function obtenerPaginaActual() {
    const urlActual = window.location.href;
    let tipo = "Auto"

    if (urlActual.includes("motos.html")) {
        tipo = "Moto";
    }

    return tipo;
}









/* Función principal que se inicia al dar click en el botón del html */
function main() {
    alert(`¡Bienvenidos a RentiAutos! \nTu mejor opción para renta de coches y motos de lujo`);

    const opcionTipoVehiculo = seleccionarTipoVehiculo();

    switch (opcionTipoVehiculo) {
        case 1:
            tipoVehiculo = "Auto";
            break;
        case 2:
            tipoVehiculo = "Moto";
            break;
        case 3:
            alert(`Gracias por su visita`);
            return;
    }

    const filtroVehiculo = obtenerVehiculosPorTipo(tipoVehiculo);

    const carrito = new Carrito();
    let opcionSeguir;
    do {
        const vehiculoSeleccionado = seleccionarVehiculo(filtroVehiculo);
        const diasARentar = parseInt(validarPrompt(`Ingrese la cantidad de días a rentar:`));
        carrito.agregarVehiculo(vehiculoSeleccionado.id, diasARentar); //Agregar objeto de vehiculo al array del carrito

        do {
            opcionSeguir = parseInt(validarPrompt(`0 - Finalizar compra \n1 - Rentar otro vehículo`));
        } while (opcionSeguir !== 0 && opcionSeguir !== 1);

        if (opcionSeguir === 0) {
            break;
        }

    } while (opcionSeguir == 1);

    alert(`Generando su factura...`)
    const total = carrito.totalPagar();
    const detalleFactura = carrito.listarCarrito();
    console.log(`Detalle de la factura \n${detalleFactura} \nTotal a pagar ${total} USD`);
    alert(`Detalle de la factura \n${detalleFactura} \nTotal a pagar ${total} USD`);

}

/* Función para validar que lo ingresado en el prompt no sea un valor nulo o en blanco */
function validarPrompt(mensaje) {
    let valor;

    //Ciclo do-while para controlar que el usuario digite información en los prompt
    do {
        valor = prompt(mensaje);
    } while (!valor || valor.trim() === '');
    return valor;
}

/* Función para validar la respuesta del usuario ante la pregunda acerca del tipo de vehículo que desea rentar. Salidas válidas 1, 2 y 3 */
function seleccionarTipoVehiculo() {
    let opcionSeleccionada;
    do {
        opcionSeleccionada = parseInt(validarPrompt(`Digite una opción: \n1. Autos \n2. Motos \n3. Salir`));
    } while (opcionSeleccionada !== 1 && opcionSeleccionada !== 2 && opcionSeleccionada !== 3);
    return opcionSeleccionada;
}

/* Función que consulta y retorna un nuevo array de objetos con el tipo de vehiculo seleccionado */
function obtenerVehiculosPorTipo(tipoVehiculo) {
    return vehiculos.filter(item => item.tipo === tipoVehiculo);
}

/* Función para listar y seleccionar por pantalla */
function seleccionarVehiculo2(filtroVehiculo) {
    let itemSeleccionado, vehiculoSeleccionado;
    do {
        itemSeleccionado = parseInt(validarPrompt(`Elija su vehículo \n\n ${mostrarVehiculosDisponibles(filtroVehiculo)}`));
        vehiculoSeleccionado = filtroVehiculo.find(item => item.id === itemSeleccionado);
        if (vehiculoSeleccionado) {
            alert(`Opción seleccionada: ${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`);
            return vehiculoSeleccionado;
        } else {
            alert(`Opción no válida, intente de nuevo`);
        }
    } while (!vehiculoSeleccionado);
}

/* Función para listar con un foreach los vehiculos del array */
function mostrarVehiculosDisponibles2(filtroVehiculo) {
    let salida = "";
    filtroVehiculo.forEach(vehiculo => {
        salida += `${vehiculo.id} - ${vehiculo.marca} ${vehiculo.modelo} - Precio: ${vehiculo.precio} \n`;
    });
    return salida;
}

/* Toastify */
function emergentToastify() {
    Toastify({
        text: `Vehiculo agregado`,
        duration: 2000,
        close: true,
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}

function guardarCarritoLScarrito() {
    carritoLS = JSON.stringify(carrito);
    localStorage.setItem("vehiculos", carritoLS);
}

function recuperarCarritoLS() {
    const vehiculosLS = localStorage.getItem("vehiculos");

}

function renderizarCarrito() {
    guardarCarritoLocalStorage(carrito);
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