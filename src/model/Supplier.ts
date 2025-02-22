
export class Supplier {
    supplierID! : string;
    firstName! : string;
    lastName! : string;
    gender! : string;
    addressLine1!: string;
    postalCode!: string;
    contactNo!: string;
    email!: string;

    constructor(
        supplierID: string,
        firstName: string,
        lastName: string,
        gender: string,
        addressLine1: string,
        postalCode: string,
        contactNo: string,
        email: string,

    ) {
        this.supplierID = supplierID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNo = contactNo;
        this.postalCode = postalCode;
        this.addressLine1 = addressLine1;
        this.gender= gender;
    }

}