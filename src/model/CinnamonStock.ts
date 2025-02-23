
export class CinnamonStock {
    stockID!: string;
    batchCode!: string;
    total!: number;
    quantity!: number;
    supplierID!: string;
    receivedDate!: Date | string;

    constructor(
        stockID: string,
        batchCode: string,
        total: number,
        quantity: number,
        supplierID: string,
        receivedDate: Date | string

    ) {
        this.stockID = stockID;
        this.batchCode = batchCode;
        this.total = total;
        this.quantity = quantity;
        this.supplierID = supplierID;
        this.receivedDate = receivedDate;
    }
}