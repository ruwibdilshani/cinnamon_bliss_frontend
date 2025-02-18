
export class Log {
    logID!: string;
    employeeID!: string;
    logsDes!: string;
    batchCode! : string;
    logDate!: Date | string;

    constructor(
        logID: string,
        employeeID: string,
        logsDes: string,
        batchCode: string,
        logDate: Date | string
    ) {
        this.logID = logID;
        this.employeeID = employeeID;
        this.logsDes = logsDes;
        this.batchCode = batchCode;
        this.logDate = logDate;
    }
}