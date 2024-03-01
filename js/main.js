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
}

const cardsVehiculos = (vehiculosFiltrados) => {
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

const crearCardsVehiculos = (vehiculo) => {
    const card = document.createElement("div");
    const pagina = obtenerPaginaActual();
    const ref = pagina == "Auto" ? "./pages/detalle.html" : "../pages/detalle.html";
    
    card.innerHTML = `
    <div class="col mb-4">
        <div class="card h-100">
            <img src="${vehiculo.imagen}" class="card-img-top" alt="${vehiculo.marca}">
            <div class="card-body">
                <h5 class="card-title text-center">${vehiculo.marca} ${vehiculo.modelo}</h5>
                <p>Este vehículo puede ser tuyo por la módica suma de ${vehiculo.precio} USD</p>
                <p class="text-center">${vehiculo.descripcion}</p>
                <div class="row">
                    <div class="col-sm-12 equal-width-btns">
                        <a class="btn btn-primary reservar-btn" onclick="addItemCarrito(${vehiculo.id}, 1);">Reservar</a>
                        <a href="${ref}" class="btn btn-primary detalle-btn" onclick="verDetalleItem(${vehiculo.id});">Detalle</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return card;
}


/* Funciones relacionadas al carrito de compra */

const recargarCarrito = () => {
    listarCarrito.innerHTML = '';
    carrito.vehiculosCarrito.forEach(vehiculo => {
        const item = recuperarListadoCarrito(vehiculo);
        listarCarrito.appendChild(item);
    });
}

const recuperarListadoCarrito = (vehiculo) => {
    const item = document.createElement("div");
    item.classList.add("row", "carritoItem");
    total = parseInt(vehiculo.cantidad) * parseInt(vehiculo.precio);
    item.innerHTML = `
        <div class="col-6">${vehiculo.marca} ${vehiculo.modelo}</div>
        <div class="col-3">
        <i class="bi bi-dash-lg" onclick="addItemCarrito(${vehiculo.id}, -1);"></i> ${vehiculo.cantidad} 
        <i class="bi bi-plus-lg" onclick="addItemCarrito(${vehiculo.id}, 1);"></i>
        </div>    
        <div class="col-2">USD ${total}</div>
        <div class="col-1" title="Eliminar"><i class="bi bi-x-circle eliminarItemCarrito" onclick="eliminarItemCarrito(${vehiculo.id});"></i></div> 
    `;
    return item;

}

const addItemCarrito = (id, cantidad) => {
    carrito.agregarVehiculo(id, cantidad);
    const cantidadTotal = carrito.vehiculosCarrito.find(item => item.id == id).cantidad;

    //No permitir valores negativos
    if (cantidadTotal <= 0) {
        eliminarItemCarrito(id);
    }

    emergentToastify();
    recargarCarrito();
}

const eliminarItemCarrito = (id) => {
    carrito.eliminarVehiculo(id)
    recargarCarrito();
}

const vaciarCarrito = () => {
    carrito.vaciarCarrito();
}

const toggleCarrito = () => {
    carritoContainer.style.display == "block" ? carritoContainer.style.display = "none" : mostrarCarrito();
}


const mostrarCarrito = () => {
    recargarCarrito();
    carritoContainer.style.display = carrito.vehiculosCarrito.length > 0 ? "block" : "none";
}


/* Función para recuperar la página actual logueada*/
const obtenerPaginaActual = () => {
    const urlActual = window.location.href;
    if (urlActual.includes("motos.html")) {
        return "Moto";
    }
    return "Auto";
}