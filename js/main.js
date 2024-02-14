/**
 * Es mejor que las cards se graben con el evento DOMContenetLoaded o se llama la función que las hace enseguida ?
 * Carrito de compras
 * Local Storage
 *
 */
 
 
/* Recuperar elementos del DOM */
 
const cardsContainer = document.querySelector("#cardsContainer");
const btnBuscar = document.querySelector("#btnSearch");
const inputVehiculos = document.querySelector("#inputAutos");
 
 
/* Eventos */
 
document.addEventListener("DOMContentLoaded", filtrarVehiculos);
btnBuscar.addEventListener("click", filtrarVehiculos);
 
inputVehiculos.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        filtrarVehiculos();
    }
});
 
 
 
 
/* Funciones */
 
function filtrarVehiculos() {
 
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
                <a href="#" class="btn btn-primary">Reservar Ahora</a>
            </div>
        </div>
    </div>
    `;
 
    return card;
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
function seleccionarVehiculo(filtroVehiculo) {
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
function mostrarVehiculosDisponibles(filtroVehiculo) {
    let salida = "";
    filtroVehiculo.forEach(vehiculo => {
        salida += `${vehiculo.id} - ${vehiculo.marca} ${vehiculo.modelo} - Precio: ${vehiculo.precio} \n`;
    });
    return salida;
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
    console.log(urlActual);
 
    if (urlActual.includes("index.html")) {
        return "Auto";
    }
 
    if (urlActual.includes("motos.html")) {
        return "Moto";
    }
 
    return null;
}
 
 
 