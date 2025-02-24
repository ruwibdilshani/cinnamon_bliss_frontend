
export class Supplier {
    supplierID! : string;
    firstName! : string;
    lastName! : string;
    gender! : string;
    addressLine01!: string;
    postalCode!: string;
    contactNo!: string;
    email!: string;

    constructor(
        supplierID: string,
        firstName: string,
        lastName: string,
        gender: string,
        addressLine01: string,
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
        this.addressLine01 = addressLine01;
        this.gender= gender;
    }

}