class Carrito {
    constructor() {
        this.vehiculosCarrito = this.recuperarLS();
        this.total = 0;
    }

    /**
    * Primero consulta por ID si el vehiculo ya existe en el carrito
    * Si no existe, consulta por ID si el vehiculo existe en base de datos para agregarlo al carrito
    */
    agregarVehiculo(id, cantidad) {
        const idVehiculo = parseInt(id);
        if (!this.existeVehiculoCarrito(idVehiculo)) {
            const vehiculo = this.existeVehiculoBaseDatos(idVehiculo);
            if (vehiculo) {
                vehiculo.cantidad = cantidad;
                this.vehiculosCarrito.push(vehiculo);
                console.log(`Vehículo con id ${vehiculo.id} agregado con éxito`);
                this.guardarLS(vehiculo.id, vehiculo.cantidad)

            } else {
                console.log(`Vehículo con id ${idVehiculo} NO existe en base de datos`);
            }
        } else {
            this.sumarDias(idVehiculo, cantidad);
        }
    }

    totalPagar() {
        this.vehiculosCarrito.forEach(vehiculo => {
            this.total += vehiculo.precio * vehiculo.cantidad;
        });
        return this.total;
    }

    sumarDias(idVehiculo, cantidad) {
        const vehiculo = this.vehiculosCarrito.find(item => item.id === idVehiculo);
        vehiculo.cantidad += cantidad;
        console.log(`Vehículo con id ${vehiculo.id} actualizado con éxito`);
        this.guardarLS(vehiculo.id, vehiculo.cantidad);
    }

    listarCarrito() {
        let listadoCarrito = "";
        this.vehiculosCarrito.forEach(item => {
            listadoCarrito += `\nID: ${item.id} - ${item.marca} ${item.modelo} - ${item.precio} USD * ${item.cantidad} días = ${item.precio * item.cantidad} USD`;
        });
        return listadoCarrito;
    }

    vaciarCarrito() {
        this.vehiculosCarrito = [];
        this.total = 0;
        localStorage.removeItem("vehiculos");
    }

    existeVehiculoBaseDatos(id) {
        return vehiculos.find(vehiculo => vehiculo.id === id);
    }

    existeVehiculoCarrito(id) {
        return this.vehiculosCarrito.some(vehiculo => vehiculo.id === id);
    }

    /** Local Storage */
    guardarLS() {
        localStorage.setItem("vehiculos", JSON.stringify(this.vehiculosCarrito));
    }

    recuperarLS() {
        const vehiculosLS = localStorage.getItem("vehiculos");
        return JSON.parse(vehiculosLS) || [];
    }


}