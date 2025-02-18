
export class CinnamonStock {
    stockID!: string;
    batchCode!: string;
    type!: string;
    quantity!: number;
    supplierID!: string;
    receivedDate!: Date | string;

    constructor(
        stockID: string,
        batchCode: string,
        type: string,
        quantity: number,
        supplierID: string,
        receivedDate: Date | string

    ) {
        this.stockID = stockID;
        this.batchCode = batchCode;
        this.type = type;
        this.quantity = quantity;
        this.supplierID = supplierID;
        this.receivedDate = receivedDate;
    }
}