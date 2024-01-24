class Usuario {
    constructor(id, nombre, apellido, correo, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.edad = edad;
        this.activo = false;
    }

    activarUsuario = () =>
        this.activo = true;
}