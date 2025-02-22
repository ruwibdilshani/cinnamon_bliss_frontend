
import { motion } from "framer-motion";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.tsx";
import {CinnamonStock} from "../../model/CinnamonStock.ts";
import {getAllSuppliers} from "../../slice/SupplierSlice.ts";
import {Product} from "../../model/Product.ts";
import {getAllProducts} from "../../slice/ProductSlice.ts";
import {Supplier} from "../../model/Supplier.ts";



interface AddCinnamonStockProps{
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onSave: (e:CinnamonStock) => void;
}

function AddCinnamonStock({ isModalOpen, setIsModalOpen, onSave }: Readonly<AddCinnamonStockProps>){

    const supplierMember : Supplier[] = useSelector((state : RootState) => state.supplier)
    const products : Product [] = useSelector((state : RootState) => state.product)
    // getAllCinnamonStock

    const dispatch = useDispatch<AppDispatch>();  // A hook to access the dispatch function from the Redux store

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch]);


    const [formData, setFormData] = useState({
        stockID: "",
        batchCode: "",
        type: "",
        quantity: "",
        supplierID:"",
        receivedDate:""
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "supplierID") {
            const supplier = supplierMember.find((supplier) => supplier.supplierID === value);
            if (supplier) {
                /*supplierName input set name*/
                const supplierName = document.getElementById("supplierName") as HTMLInputElement;
                supplierName.value = supplier.firstName + " " + supplier.lastName;
            }


        }
    }

    const handleSave = () => {
        // if (!formData.firstName || !formData.lastName || !formData.designation || !formData.email){
        //     alert("All fields are required!");
        //     return;
        // }
        const newStock = new CinnamonStock(
            "CS" + Math.floor(Math.random() * 1000),
            formData.batchCode,
            formData.type,
            Number(formData.quantity),
            formData.supplierID,
            formData.receivedDate
        );

        console.log("Add",newStock);
        onSave(newStock);
        setIsModalOpen(false);

    }


    return (
        isModalOpen && (

            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }} // Initial fade-in for the overlay
                animate={{ opacity: isModalOpen ? 1 : 0 }} // Fade-in/out animation
                exit={{ opacity: 0 }} // Fade-out on close
                transition={{ duration: 0.3 }} // Smooth transition for the background
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isModalOpen ? 0.5 : 0 }} // Fade-in to 50% opacity
                    exit={{ opacity: 0 }} // Fade-out on close
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth easing for the overlay
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and faded out
                    animate={{
                        opacity: isModalOpen ? 1 : 0,
                        scale: isModalOpen ? 1 : 0.8, // Zoom-in animation
                    }}
                    exit={{
                        opacity: 0, // Fade out
                        scale: 0.9, // Slight shrink
                        y: 50, // Slide down slightly for a smoother exit
                    }} // Shrink and fade out on close
                    transition={{
                        duration: 0.4, // Slightly longer for content to emphasize smoothness
                        ease: "easeInOut", // Professional easing
                    }}
                >

                    <h1 className="text-center text-xl font-semibold mb-5">Add Cinnamon Stock</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="supplierID" className="block text-sm font-medium text-gray-900">Supplier
                                ID</label>
                            <div className="mt-2">
                                <select
                                    name="supplierID"
                                    id="supplierID"
                                    value={formData.supplierID}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                >
                                    {/*+" "+{supplier.firstName}*/}
                                    <option value="" disabled>Select Supplier</option>
                                    {supplierMember.map((supplier) => (
                                        <option value={supplier.supplierID}>{supplier.supplierID}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="supplierName" className="block text-sm font-medium text-gray-900">Supplier
                                Name</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="supplierName"
                                    id="supplierName"
                                    readOnly={true} //meka dmm input field read krnn witrai
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="bartchCode" className="block text-sm font-medium text-gray-900">Batch
                                Code</label>
                            <div className="mt-2">
                                <select

                                    name="batchCode"
                                    id="batchCode"
                                    value={formData.batchCode}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                >
                                    {/*+" / "+product.name*/}
                                    <option value="" disabled>Select Product Type</option>
                                    {products.map((product) => (
                                        <option value={product.batchCode}>{product.batchCode}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-900">Types
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="type"
                                    id="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
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
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    required
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
                                    value={formData.receivedDate}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 font-semibold"
                    >
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <button
                                    id="btn-save"
                                    onClick={handleSave}
                                    className="bg-green-600 w-full rounded-lg py-2 px-4 text-white hover:bg-green-700 focus:outline-none"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <button
                                    id="close-modal"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default AddCinnamonStock;
