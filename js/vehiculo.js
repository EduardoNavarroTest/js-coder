class Vehiculo {

    constructor(id, tipo, marca, modelo, color, anio, descripcion, precio, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.anio = anio;
        this.descripcion = descripcion;
        this.precio = precio; //Valor en USD por día
        this.imagen = imagen;
        this.disponible = true;
    }

    /* Habilita o deshabilita la disponibilidad del vehículo de acuerdo al parámetro recibido */
    modificarDisponibilidad = (disponible) => this.disponible = disponible;
    
}

/* Variables Globales */
const vehiculos = [];

/* Función con los datos iniciales que se utilizarán para crear los objetos (Simulación de la base de datos de autos y motos) */
function crearObjetoVehiculo() {

    /*CARROS*/
    crearVehiculo(1, "Auto", "Ford", "Mustang", "Negro", "2020", "Diseño y calidad", 100, "../img/mustang.png");
    crearVehiculo(2, "Auto", "Mercedes", "Benz", "Blanco", "2024", "Elegancia y estilo", 200, "../img/mercedes-benz.png");
    crearVehiculo(3, "Auto", "BMW", "M8 GTR", "Blanco", "2023", "Seguridad al instante", 150, "../img/BMW-M8.avif");
    crearVehiculo(4, "Auto", "Chevrolet", "Camaro", "Blanco", "2021", "Diseño y calidad", 300, "../img/camaro.avif");
    crearVehiculo(5, "Auto", "Ferrari", "488", "Rojo", "2019", "Elegancia y estilo", 270, "../img/ferrari.png");
    crearVehiculo(6, "Auto", "Tesla", "S", "Blanco", "2010", "Eficiencia de combustible y la confiabilidad", 95, "../img/tesla.png");
    crearVehiculo(7, "Auto", "Lamborghini", "Veneno", "Blanco", "2024", "Seguridad al instante", 125, "../img/mustang.png");
    crearVehiculo(8, "Auto", "Buggati", "Veyron", "Blanco", "2023", "Eficiencia de combustible y la confiabilidad", 133, "../img/mustang.png");
    crearVehiculo(9, "Auto", "Mclaren", "650S", "Blanco", "2022", "Elegancia y estilo", 175, "../img/mustang.png");


    /*MOTOS*/
    crearVehiculo(10, "Moto", "Yamaha", "R6", "Blanco", "2024", "Rapidez al instante", 75, "../img/mt-15.png");
    crearVehiculo(11, "Moto", "Kawasaki", "Ninja H2R", "Blanco", "2019", "Confort y elegancia", 95, "../img/mt-15.png");
    crearVehiculo(12, "Moto", "Ducati", "Scrambler ", "Blanco", "2025", "Diseño y calidad", 125, "../img/mt-15.png");
    crearVehiculo(13, "Moto", "Yamaha", "MT 09", "Blanco", "2020", "Eficiencia de combustible", 100, "../img/mt-15.png");
    crearVehiculo(14, "Moto", "Yamaha", "R1", "Blanco", "2017", "Rapidez al instante", 135, "../img/mt-15.png");
    crearVehiculo(15, "Moto", "Yamaha", "MT 15", "Blanco", "2020", "Diseño y calidad", 95, "../img/mt-15.png");
}

/* Función que por parámetros recibe los datos de los vehículos para luego instanciar los objetos y agregarlos cada uno a un array */
function crearVehiculo(id, tipo, marca, modelo, color, anio, descripcion, precio, imagen) {
    const objVehiculo = new Vehiculo(id, tipo, marca, modelo, color, anio, descripcion, precio, imagen);
    vehiculos.push(objVehiculo);
}

crearObjetoVehiculo();




