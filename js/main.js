/**
 * PENDIENTES
 * Estilizar vista rápida
 * Agregar alert para el finalizado (A FUTURO ENVIARÁ A OTRA PÁGINA --- DONDE SE COLOCAN LOS DATOS DEL USUARIO)
 * Arreglar página de motos
 *  
 */

/* Elementos del DOM */

const cardsContainer = document.querySelector("#cardsContainer");
const btnBuscar = document.querySelector("#btnSearch");
const inputVehiculos = document.querySelector("#inputAutos");
const listarCarrito = document.querySelector("#listarCarrito");
const iconCarrito = document.querySelector("#carritoIcono");
const carritoContainer = document.querySelector("#carritoContainer");
const btnFinalizarCarrito = document.querySelector("#btnFinalizarOperacion");
const btnEliminarCarrito = document.querySelector("#btnVaciarCarrito");



/* Eventos */

document.addEventListener("DOMContentLoaded", () => {
    mostrarVehiculosDisponibles(); //Cargar las cards de los vehiculos dependiendo de la página actual, a saber, Autos o Motos
    seleccionarVehiculo();
});

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
            const cantidad = 1;
            carrito.agregarVehiculo(id, cantidad);
            emergentToastify();
            // toggleCarrito(); Logica pendiente para averiguar si el carrito está abierto
        });
    });
}

// Agregar evento de clic al icono del carrito para mostrar u ocultar los productos
iconCarrito.addEventListener('click', () => {
    toggleCarrito();
});

btnEliminarCarrito.addEventListener("click", () => {
    alertSweetDelete()
    carrito.vaciarCarrito();
    mostrarCarrito();
});


/* Instanciar objetos */
const carrito = new Carrito();


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


function vaciarCarrito() {
    carrito.vaciarCarrito();
}

function toggleCarrito() {
    carritoContainer.style.display == "block" ? carritoContainer.style.display = "none" : mostrarCarrito();
}


function mostrarCarrito() {

    listarCarrito.innerHTML = '';
    carrito.vehiculosCarrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.id} - ${item.marca} ${item.modelo} ${item.precio} USD x ${item.cantidad}`;
        listarCarrito.appendChild(li);
    });

    carritoContainer.style.display = carrito.vehiculosCarrito.length > 0 ? "block" : "none";
}


/* Función para recuperar la página actual logueada*/
function obtenerPaginaActual() {
    const urlActual = window.location.href;

    if (urlActual.includes("motos.html")) {
        return "Moto";
    }

    return "Auto";
}