

import {useDispatch, useSelector} from "react-redux";

import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {Log} from "../../model/Log.ts";
import {Employee} from "../../model/Employee.ts";
import {Product} from "../../model/Product.ts";
import {getAllProducts} from "../../slice/ProductSlice.ts";
import {getAllEmployees} from "../../slice/EmployeeSlice.ts";






interface AddLogProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onSave: (newLog: Log) => void;
}
function AddLog({ isModalOpen, setIsModalOpen, onSave }: Readonly<AddLogProps>) {
    const products : Product[] = useSelector((state:  {product:Product[]} ) => state.product);
    const employeeMember : Employee[] = useSelector((state: { employee:Employee[]}) => state.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!employeeMember || employeeMember.length === 0) {
            dispatch(getAllEmployees());
        }
    }, []);

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
    }, []);




    const [formData, setFormData] = useState({

        logsDes: '',
        employeeID: '',
        batchCode: '',
        showImage: ''

    });

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }



    function handleFileUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        imageKey: "showImage"
    ) {
        const file = e.target.files?.[0];

        if(file){
            setFormData({
                ...formData,
                [imageKey]: URL.createObjectURL(file),


            })
        }
    }

    const [loading , setLoading] = useState(false);
    const handleSave = async () => {


        if (formData.showImage) {
            try {
                setLoading(true);

                // Upload the image and get the URL
                const fileInput = document.getElementById("file") as HTMLInputElement;
                const file = fileInput?.files?.[0];

                if (!file) {
                    toast.error("No image selected for upload.");
                    return;
                }

                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "ruwani");
                data.append("cloud_name", 'dxbgbdip8');

                const res = await fetch("https://api.cloudinary.com/v1_1/dxbgbdip8/image/upload", {
                    method: "POST",
                    body: data,
                });

                const uploadResponse = await res.json();
                const uploadedImageUrl = uploadResponse.url;

                if (!uploadedImageUrl) {
                    toast.error("No image selected for upload.");
                    return;
                }

                console.log("Uploaded Image URL:", uploadedImageUrl.url);

                // Create a new log with the uploaded image URL
                const newLog = new Log(
                    "LO" + Math.floor(Math.random() * 1000),
                    formData.employeeID,
                    formData.logsDes,
                    formData.batchCode,
                    new Date(),
                    uploadedImageUrl

                );

                onSave(newLog);
            } catch (error) {
                console.error("Error saving log:", error);
            } finally {
                setLoading(false);
            }
        }
    };




    return (
        isModalOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                ></motion.div>

                {/* Modal Content */}
                <motion.div
                    className="bg-amber-100 rounded-lg p-8 w-full sm:w-[42vw] drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">Add Log</h1>
                    <div className="overflow-y-auto h-[56vh] p-4 custom-scrollbar">


                        <div id="file-upload-container" className="relative mb-12">
                            <label
                                htmlFor="file"
                                className={`flex flex-col items-center justify-center ${formData.showImage ? "hidden" : "block"} bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
                            >
                                <svg
                                    className="h-12 mb-4 fill-green-600"
                                    viewBox="0 0 640 512"
                                >
                                    <path
                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                </svg>
                                <p className="text-gray-700 text-lg font-semibold">
                                    Drag and Drop
                                </p>
                                <p className="text-gray-600">or</p>
                                <span
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition-all">
            Browse file
        </span>
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, "showImage")}
                                />
                            </label>

                            {/* Display selected image */}
                            {formData.showImage && (
                                <div className="relative">
                                    <img
                                        src={formData.showImage}
                                        alt="Preview"
                                        className="rounded-lg shadow-xl object-cover z-50 w-full h-64"
                                    />

                                    {loading && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                                            <div className="flex flex-col items-center">
                                                <i className="fa fa-spinner fa-spin text-white text-6xl"></i>
                                                <p className="text-white text-lg mt-4">Uploading, please wait...</p>
                                            </div>
                                        </div>
                                    )}



                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({...formData, showImage: ''})}
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>


                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="employee-ID" className="block text-sm font-medium text-gray-900">Employee
                                </label>
                            <div className="mt-2">
                                <select
                                    name="employeeID"
                                    id="employee-ID"
                                    value={formData.employeeID}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select Employee</option>
                                    {employeeMember.map((employee) => (
                                        <option value={employee.employeeID}>{employee.employeeID} / {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>



                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="batchCode" className="block text-sm font-medium text-gray-900">Product
                                ID</label>
                            <div className="mt-2">
                                <select
                                    name="batchCode"
                                    id="batchCode"
                                    value={formData.batchCode}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select Product</option>
                                    {products.map((production) => (
                                        <option value={production.batchCode}>{production.batchCode} / {production.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="observation"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Observation
                            </label>
                            <textarea
                                id={'logsDes'}
                                name="logsDes"
                                className="mt-2 block w-full h-[20vh] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-6 gap-4 font-semibold">
                        <div className="sm:col-span-3">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 w-full rounded-lg py-2 text-white hover:bg-green-700 focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                        <div className="sm:col-span-3">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);

                                }}
                                className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default AddLog;
