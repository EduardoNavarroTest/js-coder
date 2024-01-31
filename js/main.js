const botonBusqueda = document.querySelector("#btnStart");
botonBusqueda.addEventListener("click", main);

/* Función principal que se inicia al dar click en el botón del html */
function main() {
    alert("¡Bienvenidos a RentiAutos! \nTu mejor opción para renta de coches y motos de lujo");

    const opcionTipoVehiculo = seleccionarTipoVehiculo();

    switch (opcionTipoVehiculo) {
        case 1:
            tipoVehiculo = "Auto";
            break;
        case 2:
            tipoVehiculo = "Moto";
            break;
        case 3:
            alert("Gracias por su visita");
            return;
    }

    const filtroVehiculo = obtenerVehiculosPorTipo(tipoVehiculo);

    const carrito = new Carrito();
    let opcionSeguir;
    do {
        const vehiculoSeleccionado = seleccionarVehiculo(filtroVehiculo);
        const diasARentar = parseInt(validarPrompt("Ingrese la cantidad de días a rentar:"));
        carrito.agregarVehiculo(vehiculoSeleccionado.id, diasARentar); //Agregar objeto de vehiculo al array del carrito

        do {
        opcionSeguir = parseInt(validarPrompt("0 - Finalizar compra \n1 - Rentar otro vehículo"));
        } while(opcionSeguir!==0 && opcionSeguir!==1);

        if(opcionSeguir === 0){
            break;
        }

    } while (opcionSeguir==1);

    alert("Generando su factura...")
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
        opcionSeleccionada = parseInt(validarPrompt("Digite una opción: \n1. Autos \n2. Motos \n3. Salir"));
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
        itemSeleccionado = parseInt(validarPrompt("Elija su vehículo \n\n" + mostrarVehiculosDisponibles(filtroVehiculo)));
        vehiculoSeleccionado = filtroVehiculo.find(item => item.id === itemSeleccionado);
        if (vehiculoSeleccionado) {
            alert("Opción seleccionada: " + vehiculoSeleccionado.marca + " " + vehiculoSeleccionado.modelo);
            return vehiculoSeleccionado;
        } else {
            alert("Opción no válida, intente de nuevo");
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





