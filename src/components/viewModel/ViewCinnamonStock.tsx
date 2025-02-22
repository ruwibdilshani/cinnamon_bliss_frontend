import { motion } from "framer-motion";

import {formatDate} from "../../util/util.ts";

import {CinnamonStock} from "../../model/CinnamonStock.ts";

import {useEffect} from "react";
import {getAllSuppliers} from "../../slice/SupplierSlice.ts";
import {getAllProducts} from "../../slice/ProductSlice.ts";
import {useDispatch, useSelector} from "react-redux";

import {Product} from "../../model/Product.ts";
import {Supplier} from "../../model/Supplier.ts";
import {AppDispatch} from "../../store/store.tsx";

interface ViewCinnamonStockProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    cinnamonStock: CinnamonStock;
}

function ViewCinnamonStock({ isOpenModal, setIsOpenModal, cinnamonStock }: Readonly<ViewCinnamonStockProps>){

const supplierMember : Supplier[] = useSelector((state : {suppliers : Supplier[]}) => state.suppliers)
const products : Product [] = useSelector((state : {product : Product[]}) => state.product)
    const dispatch = useDispatch<AppDispatch>();


useEffect(() => {
    if (!products || products.length === 0) {
        dispatch(getAllProducts());
    }
}, [dispatch, products]);



    return (
        isOpenModal && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpenModal ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpenModal ? 0.5 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isOpenModal ? 1 : 0, scale: isOpenModal ? 1 : 0.8 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">View Staff Member</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2 font-medium">


                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                            <div className="sm:col-span-3 py-5">
                                <label htmlFor="supplierName" className="block text-sm font-medium text-gray-900">Supplier
                                    ID</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={cinnamonStock.supplierID}
                                        readOnly={true}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3 py-5">
                                <label htmlFor="supplierName" className="block text-sm font-medium text-gray-900">Supplier
                                    Name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplierMember.find((supplier) => supplier.supplierID === cinnamonStock.supplierID)?.firstName +" "+ supplierMember.find((supplier) => supplier.supplierID === cinnamonStock.supplierID)?.lastName}
                                        readOnly={true}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>


                        </div>


                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                            <div className="sm:col-span-3 py-5">
                                <label htmlFor="batchCode" className="block text-sm font-medium text-gray-900">Product Code
                                    </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={cinnamonStock.batchCode+" / "+products.find((product : Product) => product.batchCode === cinnamonStock.batchCode)?.name}
                                        readOnly={true}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>



                        </div>



                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">Quantity
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    value={cinnamonStock.quantity}
                                    readOnly={true}

                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="receivedDate" className="block text-sm font-medium text-gray-900">Date of
                                Received</label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="receivedDate"
                                    id="receivedDate"
                                    value={formatDate(cinnamonStock.receivedDate)}// Date type ena nisa eka util directyr atule tiyn formatDate ekaen string krl gnnw
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 font-semibold ">
                        <div className="sm:col-span-6">
                            <div className="mt-2">
                                <button
                                    onClick={() => setIsOpenModal(false)}
                                    className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none "
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default ViewCinnamonStock;
