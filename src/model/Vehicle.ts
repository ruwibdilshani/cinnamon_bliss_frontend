
export class Vehicle {
    vehicleID!: string;
    licensePlate!: string;
    model!: string;
    capacity!:string;
    available! : boolean;
    employeeID!: string;

    constructor(
        vehicleID: string,
        licensePlate: string,
        model: string,
        capacity: string,
        available: boolean,
        employeeID: string
    ) {
        this.vehicleID = vehicleID;
        this.licensePlate = licensePlate;
        this.model = model;
        this.capacity = capacity;
        this.available = available;
        this.employeeID = employeeID;
    }
}