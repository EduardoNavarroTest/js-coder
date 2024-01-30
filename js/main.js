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
        const diasARentar = parseInt(validarPrompt("Ingrese la cantidad de días a rentar"));
        carrito.agregarVehiculo(vehiculoSeleccionado.id, diasARentar);

        do {
        opcionSeguir = parseInt(validarPrompt("0 - Finalizar compra \n1 - Rentar otro vehículo"));
        } while(opcionSeguir!==0 && opcionSeguir!==1);

        if(opcionSeguir === 0){
            break;
        }

    } while (opcionSeguir==1);

    alert("Generando su factura...")
    const totalAPagar = carrito.totalPago();

    console.log(carrito.listarCarrito())
    console.log(`Total a pagar es de: ${totalAPagar}`);
}

/**
 * Función para validar la respuesta del usuario ante la pregunda de qué tipo de vehículo va a rentar
 * Las salidas válidas son 1, 2 y 3
 */
function seleccionarTipoVehiculo() {
    let opcionSeleccionada;
    do {
        opcionSeleccionada = parseInt(validarPrompt("Digite una opción: \n1. Autos \n2. Motos \n3. Salir"));
    } while (opcionSeleccionada !== 1 && opcionSeleccionada !== 2 && opcionSeleccionada !== 3);
    return opcionSeleccionada;
}



/*
*Función para pedir datos del usuario por medio de los prompt y almacenarlos en variables, para luego crear un objeto Usuario con los datos.
*/
function datosRegistroUsuario() {

    /* Declaración de variables */
    let id, nombre, apellido, correo, telefono, edad, direccion, diasRentar, valorDia, valorTotal;

    id = validarPrompt("Ingrese su identificación:");
    nombre = validarPrompt("Ingrese su nombre:");
    apellido = validarPrompt("Ingrese sus apellidos:");
    correo = validarPrompt("Ingrese su email:");
    telefono = validarPrompt("Ingrese su teléfono de contacto:");
    edad = parseInt(validarPrompt("Ingrese su edad:"));
    direccion = validarPrompt("Ingrese su dirección:");
    crearUsuario(id, nombre, apellido, correo, telefono, edad, direccion);
    return id;


}





/*
* Función para validar que lo ingresado en el prompt no sea un valor nulo o en blanco
*/
function validarPrompt(mensaje) {
    let valor;

    //Ciclo do-while para controlar que el usuario digite información en los prompt
    do {
        valor = prompt(mensaje);
    } while (!valor || valor.trim() === '');
    return valor;
}


/* 
* Función para validar si un usuario es mayor de edad
* retorna un valor booleano con la respuesta
*/
function validarEdad(edad) {
    let edadMinima = 18;
    let edadMaxima = 80;
    let puedeConducir = true;
    if (edad < edadMinima || edad > edadMaxima) {
        alert("Lo sentimos, no tiene la edad adecuada para conducir un vehículo");
        puedeConducir = false;
    }
    return puedeConducir;
}



/** Retorna array de objetos con el tipo de vehiculo seleccionado */
function obtenerVehiculosPorTipo(tipoVehiculo) {
    return vehiculos.filter(item => item.tipo === tipoVehiculo);
}

function seleccionarVehiculo(filtroVehiculo) {
    let itemSeleccionado;
    do {
        itemSeleccionado = parseInt(validarPrompt("Elija su vehículo (0 - Salir) \n\n" + mostrarVehiculosDisponibles(filtroVehiculo)));
        if (itemSeleccionado === 0) {
            alert("Generando factura....");
            break;
        }

        const vehiculoSeleccionado = filtroVehiculo.find(item => item.id === itemSeleccionado);
        if (vehiculoSeleccionado) {
            alert("Opción seleccionada: " + vehiculoSeleccionado.marca + " " + vehiculoSeleccionado.modelo);
            return vehiculoSeleccionado;
        } else {
            alert("Opción no válida, intente de nuevo");
        }
    } while (itemSeleccionado !== 0);
}

function mostrarVehiculosDisponibles(filtroVehiculo) {
    let salida = "";
    filtroVehiculo.forEach(vehiculo => {
        salida += `${vehiculo.id} - ${vehiculo.marca} ${vehiculo.modelo} - Precio: ${vehiculo.precio} \n`;
    });
    return salida;
}


/** Funciones que por ahora no uso pero usaré más adelante cuando esté trabajando con el DOM */

/* Verificar la opción 0 cuando se listan los productos */

/** Optimizar el doble do while */