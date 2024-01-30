class Carrito {
    constructor() {
        this.vehiculos = [];
        this.totalPagar = 0;
    }

    agregarVehiculo(idVehiculo, diasRentar) {
        /**
         * Si el vehículo no existe en el carrito, lo agrega
         * Si existe, suma los días a los que ya tiene
         */
        const existeVehiculo = this.vehiculos.some(item => item.id === idVehiculo);
        if (!existeVehiculo) {
            const vehiculo = vehiculos.find(item => item.id === idVehiculo);
            if (vehiculo) {
                vehiculo.diasRentar = diasRentar;
                this.vehiculos.push(vehiculo);
                console.log(`Vehículo con id ${vehiculo.id} agregado con éxito`);
            } else {
                console.log(`Vehículo con id ${vehiculo.id} NO existe`);
            }

        } else {
            this.sumarDias(idVehiculo, diasRentar);
        }
    }

    restarDias() {
        /* Proximamente cuando se pueda seleccionar o quitar en el DOM */
    }

    totalPago() {
        this.totalPagar = 0;
        this.vehiculos.forEach(vehiculo => {
            this.totalPagar += vehiculo.precio * vehiculo.diasRentar;
        });
        return this.totalPagar;

    }

    sumarDias(idVehiculo, diasRentar) {
        const vehiculo = this.vehiculos.find(item => item.id === idVehiculo);
        vehiculo.diasRentar += diasRentar;
        console.log(`Vehículo con id ${vehiculo.id} actualizado con éxito`);
    }

    listarCarrito() {
        this.vehiculos.forEach(element => {
            console.log(element.id, element.marca, element.modelo, element.precio, element.diasRentar);
        });
    }
}