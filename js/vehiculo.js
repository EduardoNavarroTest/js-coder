class Vehiculo {

    constructor(id, tipo, marca, modelo, color, anio, descripcion, precio) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.anio = anio;
        this.descripcion = descripcion;
        this.precio = precio; //Valor en USD por día
        this.disponible = true;
    }

    modificarDisponibilidad = (disponible) => {
        this.disponible = true
    }

}

/* Variables Globales */
const vehiculos = [];

/**
 * Función con los datos iniciales que se utilizarán para crear los objetos
 */
function crearObjetoVehiculo() {

    /*CARROS*/
    crearVehiculo(1, "Auto", "Ford", "Mustang", "Negro", "2020", "Diseño y calidad", 100);
    crearVehiculo(2, "Auto", "Mercedes", "Benz", "Blanco", "2024", "Elegancia y estilo", 200);
    crearVehiculo(3, "Auto", "BMW", "M8 GTR", "Blanco", "2023", "Seguridad al instante", 150);
    crearVehiculo(4, "Auto", "Chevrolet", "Camaro", "Blanco", "2021", "Diseño y calidad", 300);
    crearVehiculo(5, "Auto", "Ferrari", "488", "Rojo", "2019", "Elegancia y estilo", 270);
    crearVehiculo(6, "Auto", "Tesla", "S", "Blanco", "2010", "Eficiencia de combustible y la confiabilidad", 95);
    crearVehiculo(7, "Auto", "Lamborhini", "PENDIENTE", "Blanco", "2024", "Seguridad al instante", 125);
    crearVehiculo(8, "Auto", "Bucati", "PENDIENTE", "Blanco", "2023", "Eficiencia de combustible y la confiabilidad", 75);
    crearVehiculo(9, "Auto", "Mclaren", "PENDIENTE", "Blanco", "2022", "Elegancia y estilo", 175);


    /*MOTOS*/
    crearVehiculo(10, "Moto", "Yamaha", "R6", "Blanco", "2024", "Rapidez al instante", 75);
    crearVehiculo(11, "Moto", "Kawasaki", "Nija H2R", "Blanco", "2019", "Confort y elegancia", 95);
    crearVehiculo(12, "Moto", "Ducati", "PENDIENTE", "Blanco", "2025", "Diseño y calidad", 125);
    crearVehiculo(13, "Moto", "Yamaha", "MT 09", "Blanco", "2020", "Eficiencia de combustible", 100);
    crearVehiculo(14, "Moto", "Yamaha", "R1", "Blanco", "2017", "Rapidez al instante", 135);
    crearVehiculo(15, "Moto", "Yamaha", "MT 15", "Blanco", "2020", "Diseño y calidad", 95);
}

/**
 * Función que por parámetros recibe los datos de los vehículos para luego instanciar los objetos y agregarlos todos a un array
 */
function crearVehiculo(id, tipo, marca, modelo, color, anio, descripcion, precio) {
    const objVehiculo = new Vehiculo(id, tipo, marca, modelo, color, anio, descripcion, precio);
    vehiculos.push(objVehiculo);
}

crearObjetoVehiculo();

/*
const inhabilitar = vehiculos.find(auto => auto.id = 10);

if (inhabilitar){
    inhabilitar.modificarDisponibilidad(false);
}
*/

console.log(vehiculos);

