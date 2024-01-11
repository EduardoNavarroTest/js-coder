/*
* Función inicial que es llamada en el botón del HTML
*/
function principal() {
    pedirDatos();
}


/*
*Función para pedir datos por medio de los prompt
*/
function pedirDatos() {

    /* Declaración de variables */
    let nombre, apellido, edad, esMayor, auto, diasRentar, valorDia, valorTotal;


    nombre = validarPrompt("Por favor, ingresa tu nombre:");
    apellido = validarPrompt("Por favor, ingresa tu apellido:");
    edad = parseInt(validarPrompt("Por favor, ingresa tu edad:"));
    esMayor = validarEdad(edad);


    //Si el usuario no es mayor de edad, se sale de la aplicación
    if (!esMayor) {
        return;
    }

    alert("¡Bienvenido! " + nombre + " " + apellido);
    auto = validarPrompt("Por favor, seleccione el número de la opción: \n 1. Mclaren  \n 2. Chevrolet Camaro  \n 3. Ford Mustang  \n 4. Tesla \n 5. Ferrari \n 6. Mercedes Benz \n 7. BMW \n 8. Bucati \n 9. Lamborgini");

    switch (parseInt(auto)) {
        case 1:
            alert("Opción seleccionada: MCALREN");
            break;
        case 2:
            alert("Opción seleccionada: CHEVROLET CAMARO");
            break;
        case 3:
            alert("Opción seleccionada: FORD MUSTANG");
            break;
        case 4:
            alert("Opción seleccionada: TESLA");
            break;
        case 5:
            alert("Opción seleccionada: FERRARI");
            break;
        case 6:
            alert("Opción seleccionada: MERCEDES BENZ");
            break;
        case 7:
            alert("Opción seleccionada: BMW M8 GTR");
            break;
        case 8:
            alert("Opción seleccionada: BUCATI");
            break;
        case 9:
            alert("Opción seleccionada: LAMBORGINI");
            break;
        default:
            alert("No seleccionó una opción válida, vuelva a realizar el proceso. Adios :( ")
            return;
    }

    diasRentar = validarPrompt("Por favor, ingrese la cantidad de días a rentar:")
    valorDia = 50; //USD
    valorDiaDescuento = 35 //USD Descuento aplica a partir del quinto día
    valorTotal = 0;


    //El usuario tendrá descuento a partir del quinto día del alquiler
    console.log("Factura de Renta # XXXXXX:");

    for (let i=1; i<=diasRentar; i++){
        if(i<5){
            valorTotal+=valorDia;
            console.log("Valor del día: " + i + " es de: " + valorDia + " USD");
        }else{
            valorTotal+=valorDiaDescuento;
            console.log("Valor del día: " + i + " es de: " + valorDiaDescuento + " USD");
        }
        
    }
    console.log("***** TOTAL: " + valorTotal + " USD *****");
    console.log("***** GRACIAS POR SU COMPRA *****");

    alert("El valor total a pagar es: " + valorTotal + " USD. Gracias por elegirnos.");


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
    let puedeConducir = false;

    if (edad < edadMinima) {
        alert("Lo sentimos, no tiene la edad suficiente para realizar esta operación");
    } else if (edad > edadMaxima) {
        alert("Lo sentimos, no podemos rentar autos por su edad");
    } else {
        puedeConducir = true; //Variable booleana solo cambia a true si cuenta con la edad estipualda 
    }
    return puedeConducir;
}
