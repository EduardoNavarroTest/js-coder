class Vehiculo {

    constructor(id, tipo, marca, modelo, color, anio, descripcion, precio, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.anio = anio;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.disponible = true;
    }

    /* Habilita o deshabilita la disponibilidad del vehículo de acuerdo al parámetro recibido */
    modificarDisponibilidad = (disponible) => this.disponible = disponible;

}