class Vehiculo {

    constructor(id, tipo, marca, modelo, color, anio, descripcion, precio, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.anio = anio;
        this.descripcion = descripcion;
        this.precio = precio; //Valor en USD
        this.imagen = imagen;
        this.disponible = true;
    }

    /* Habilita o deshabilita la disponibilidad del vehículo de acuerdo al parámetro recibido */
    modificarDisponibilidad = (disponible) => this.disponible = disponible;

}

/* Variables Globales */
const vehiculos = [];

/* Consumir API para alimentar la "Base de Datos de Vehículos" */
async  function crearVehiculo() {
    // fetch('./js/vehiculos.json')
    //     .then(respuesta => respuesta.json())
    //     .then(data => {
    //         for (const item of data) {
    //             const objVehiculo = new Vehiculo(item.id, item.tipo, item.marca, item.modelo, item.color, item.anio, item.descripcion, item.precio, item.imagen)
    //             vehiculos.push(objVehiculo);
    //         }
    //     })

        const respuesta = await fetch('./js/vehiculos.json');
        const data = await respuesta.json();
        for (const item of data) {
            const objVehiculo = new Vehiculo(item.id, item.tipo, item.marca, item.modelo, item.color, item.anio, item.descripcion, item.precio, item.imagen)
            vehiculos.push(objVehiculo);
        }
}