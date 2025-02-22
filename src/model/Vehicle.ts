
export class Vehicle {
    vehicleID!: string;
    licensePlate!: string;
    model!: string;
    capacity!:number;
    available! : boolean;
    employeeID!: string | null;

    constructor(
        vehicleID: string,
        licensePlate: string,
        model: string,
        capacity: number,
        available: boolean,
        employeeID: string | null
    ) {
        this.vehicleID = vehicleID;
        this.licensePlate = licensePlate;
        this.model = model;
        this.capacity = capacity;
        this.available = available;
        this.employeeID = employeeID;
    }
}