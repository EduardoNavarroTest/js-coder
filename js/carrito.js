class Carrito {
    constructor() {
        this.vehiculos = [];
        this.total = 0;
    }

    agregarVehiculo(id, diasRentar) {

        /* Si el vehículo existe, va al método sumarDias(), de lo contrario agrega el nuevo objeto al array */
        const idVehiculo = parseInt(id);
        const existeVehiculo = this.vehiculos.some(item => item.id === idVehiculo);
        if (!existeVehiculo) {
            const vehiculo = vehiculos.find(item => item.id === idVehiculo);
            if (vehiculo) {
                vehiculo.diasRentar = diasRentar;
                this.vehiculos.push(vehiculo);
                console.log(`Vehículo con id ${vehiculo.id} agregado con éxito`);
            } else {
                console.log(`Vehículo con id ${idVehiculo} NO existe`);
            }

        } else {
            this.sumarDias(idVehiculo, diasRentar);
        }
    }

    totalPagar() {
        this.vehiculos.forEach(vehiculo => {
            this.total += vehiculo.precio * vehiculo.diasRentar;
        });
        return this.total;
    }

    sumarDias(idVehiculo, diasRentar) {
        const vehiculo = this.vehiculos.find(item => item.id === idVehiculo);
        vehiculo.diasRentar += diasRentar;
        console.log(`Vehículo con id ${vehiculo.id} actualizado con éxito`);
    }

    listarCarrito() {
        let listadoCarrito = "";
        this.vehiculos.forEach(item => {
            listadoCarrito += `\nID: ${item.id} - ${item.marca} ${item.modelo} - ${item.precio} USD * ${item.diasRentar} días = ${item.precio * item.diasRentar} USD`;
        });
        return listadoCarrito;
    }

    vaciarCarrito(){
        this.vehiculos = [];
        this.total = 0;
    }
}