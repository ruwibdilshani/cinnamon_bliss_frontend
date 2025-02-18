

export class Product {
    batchCode! : string;
    name! : string;
    price! : number;
    quality! : string;
    observedImage! :string ;

    constructor(
        batchCode: string,
        name: string,
        price: number,
        quality: string,
        observedImage: string
    ) {
        this.batchCode = batchCode;
        this.name = name;
        this.price = price;
        this.quality = quality;
        this.observedImage = observedImage;
    }


}