
function principal(){
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
    auto = validarPrompt("Por favor, seleccione el auto a rentar: \n 1. Toyota Corolla  \n 2. Chevrolet Camaro  \n 3. Ford Mustang  \n 4. Tesla ");

    //Reemplazar más adelante por un switch
    if (auto == 1) {
        alert("Toyota Corolla: Calidad y elegancia");
    } else if (auto == 2) {
        alert("Chevrolet Camaro: Potente rendimiento en carretera");
    } else if (auto == 3) {
        alert("Ford Mustan: Estilo y confort");
    } else if (auto == 4) {
        alert("Tesla: Una mirada hacia el futuro");
    } else {
        alert("No seleccionó una opción válida, vuelva a realizar el proceso. Adios :( ")
        return;
    }

    diasRentar = validarPrompt("Por favor, ingrese la cantidad de días a rentar:")
    valorDia = 50; //USD
    valorTotal = valorDia * diasRentar;

    alert("El valor total a pagar es: " + valorTotal + " USD. Recuerda manejar con cuidado");


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
    let esMayor = edad >= 18;
    if (!esMayor) {
        alert("Lo sentimos, no tiene la edad suficiente para realizar esta operación");
    }
    return esMayor;
}
