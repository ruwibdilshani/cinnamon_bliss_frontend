import {Product} from "../../model/Product.ts";

interface AddProductProps{
    isModalOpen:boolean;
    setIsModalOpen:(open: boolean) => void;
    onSave: (e:Product) => void;
}

function AddProduct({

                    })