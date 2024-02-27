/* Clase Usuario => Por el momento no se utiliza, se le dará uso cuando se trabaje con el DOM y reciba los datos por un formulario */

class Usuario {
    constructor(id, nombre, apellido, correo, telefono, edad, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.edad = edad;
        this.direccion = direccion;
        this.activo = false;
    }

    activarUsuario = () => this.activo = true;

    obtenerInformacion() {
        console.log(`ID: ${this.id}, Nombre: ${this.nombre} ${this.apellido}, Correo: ${this.correo}, Edad: ${this.edad}, Activo: ${this.activo ? 'Sí' : 'No'}`);
    }
}

/* Variables Globales */
const usuarios = [];

/* Función que por parámetros recibe los datos de los usuarios para luego instanciar los objetos y agregarlos todos a un array */
function crearUsuario(id, nombre, apellido, correo, telefono, edad, direccion) {
    const objUsuario = new Usuario(id, nombre, apellido, correo, telefono, edad, direccion);
    objUsuario.activarUsuario();
    usuarios.push(objUsuario);
}