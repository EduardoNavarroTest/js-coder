class Usuario {
    constructor(id, nombre, apellido, correo, telefono, edad, direccion, test) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.edad = edad;
        this.direccion = direccion;
        this.activo = false;
    }

    activarUsuario = () =>
        this.activo = true;
}

/* Variables Globales */
const usuarios = [];

/**
 * Función con los datos iniciales que se utilizarán para crear los objetos
 */
function crearUsuarioDefault() {

    /* Usuario default para pruebas */
    crearUsuario(1052988, "Eduardo", "Navarro", "eduardonavarro.test@gmail.com", "3002918447", 99, "Cartagena - Colombia");
   
}


/**
 * Función que por parámetros recibe los datos de los usuarios para luego instanciar los objetos y agregarlos todos a un array
 */
function crearUsuario(id, nombre, apellido, correo, telefono, edad, direccion) {
    const objUsuario = new Usuario(id, nombre, apellido, correo, telefono, edad, direccion);
    objUsuario.activarUsuario();
    usuarios.push(objUsuario);
}


crearUsuarioDefault();
console.log(usuarios);