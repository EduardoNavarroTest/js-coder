class Vehiculo {

    constructor(tipo, marca, modelo, color, anio, descripcion, precio) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.anio = anio;
        this.descripcion = descripcion;
        this.precio = precio; //Valor del alquiler por día
        this.disponible = false;
    }

    abrirDisponibilidad = () =>
        this.disponible = true;

}

/* Creación de vehiculos (motos y autos) */

/*Autos*/ 
const toyotaCorolla20 = new Vehiculo("Auto", "Toyota", "Corolla", "Blanco", "2020", "Eficiencia de combustible y la confiabilidad", 100);
toyotaCorolla20.abrirDisponibilidad();


/*Motos*/ 