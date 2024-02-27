/**
 * PENDIENTES
 * Recuperar elementos por API [OK - Falta que carguen antes que la página]
 * Las cards tendrán dos botones, el de Comprar y el de ver Detalle
 * Al comprar o al ver detalles reemplazar la funcionalidad actual por onClick
 * Crear página detalle producto
 * Crear página carrito / finalizar (si el usuario existe, se recuperarán los datos digitados)
 * Migrar la ventana emergente a la propia página de carrito
 * Ordenar por nombre, mayor o menor precio
 * Colocar un número <span> al icono del carrito que se vaya subiendo dependiendo de la longitud del array
 * Agregar Total a pagar en la página del carrito 
 * Hacer funcional eliminarItemCarrito
 * 
 */


/* Recuperar elementos del DOM */

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
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const cantidad = 1;
            carrito.agregarVehiculo(id, cantidad);
            emergentToastify();
            recargarCarrito();
        });
    });
}


// Agregar evento de clic al icono del carrito para mostrar u ocultar los productos
iconCarrito.addEventListener("click", () => {
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

    // Volver a asignar eventos a los botones "Reservar Ahora" después de filtrar
    seleccionarVehiculo();
}

function cardsVehiculos(vehiculosFiltrados) {
    alertWaitSweet(250);
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


const alertMensaje = (tipoAlerta, mensaje) => {
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
                <div class="row">
                    <div class="col-sm-12 equal-width-btns">
                        <button class="btn btn-primary reservar-btn" onclick="agregarItemCarrito(${vehiculo.id}, 1);">Reservar Ahora</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return card;
}


const vaciarCarrito = () => {
    carrito.vaciarCarrito
};

const agregarItemCarrito = (id, cantidad) => {
    carrito.agregarItemCarrito(id, cantidad);

}

const toggleCarrito = () => {
    carritoContainer.style.display == "block" ? carritoContainer.style.display = "none" : mostrarCarrito();
}

const mostrarCarrito = () => {
    recargarCarrito();
    carritoContainer.style.display = carrito.vehiculosCarrito.length > 0 ? "block" : "none";
}

const eliminarItemCarrito = (id) => {
    alert("Producto a borrar " + id);
}

function recuperarListadoCarrito(vehiculo) {
    const item = document.createElement("div");
    item.classList.add("row", "carritoItem");
    total = parseInt(vehiculo.cantidad) * parseInt(vehiculo.precio);
    item.innerHTML = `
        <div class="col-6">${vehiculo.marca} ${vehiculo.modelo}</div>
        <div class="col-3"><i class="bi bi-dash-lg"></i> ${vehiculo.cantidad} <i class="bi bi-plus-lg"></i></div>
        <div class="col-2">USD ${total}</div>
        <div class="col-1" title="Eliminar"><i class="bi bi-x-circle eliminarItemCarrito" onclick="eliminarItemCarrito(${vehiculo.id});"></i></div> 
    `;
    return item;
}

function recargarCarrito() {
    listarCarrito.innerHTML = '';
    carrito.vehiculosCarrito.forEach(vehiculo => {
        const item = recuperarListadoCarrito(vehiculo);
        listarCarrito.appendChild(item);
    });
}

/* Función para recuperar la página actual logueada*/
function obtenerPaginaActual() {
    const urlActual = window.location.href;

    if (urlActual.includes("motos.html")) {
        return "Moto";
    }

    return "Auto";
}