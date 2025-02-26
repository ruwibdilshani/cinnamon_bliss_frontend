
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {Employee} from "../../model/Employee.ts";
import {Supplier} from "../../model/Supplier.ts";
import {getAllEmployees} from "../../slice/EmployeeSlice.ts";
import {getAllSuppliers} from "../../slice/SupplierSlice.ts";
import {AppDispatch} from "../../store/store.tsx";
import {Log} from "../../model/Log.ts";
import {Product} from "../../model/Product.ts";
import {getAllProducts} from "../../slice/ProductSlice.ts";


interface LogActionProps{
    log: Log;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    onUpdateLog: (log: Log) => void;
    onDeleteLog: (log:Log) => void;
}

function LogActions({log, isModalOpen, setModalOpen, onUpdateLog, onDeleteLog }: Readonly<LogActionProps>) {
    const products : Product[] = useSelector((state:  {product:Product[]} ) => state.product);
    const employeeMember : Employee[] = useSelector((state: { employee:Employee[]}) => state.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
        if (!employeeMember || employeeMember.length === 0) {
            dispatch(getAllEmployees());
        }
    }, []);


    const [formData, setFormData] = useState({

        logsDes: log.logsDes,
        employeeID: log.employeeID,
        batchCode: log.batchCode,
        logImage: log.logImage,
        showImage: log.logImage,

    });


    useEffect(() => {
        setFormData({
            logsDes: log.logsDes,
            employeeID: log.employeeID,
            batchCode: log.batchCode,
            logImage: log.logImage,
            showImage: log.logImage,
        });
    }, [isModalOpen]);

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement >) {
        const {name, value } = e.target;
        setFormData({ ...formData, [name]: value});

        console.log(formData);
    }


    function handleFileUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        imageKey: "observedImage"
    ) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [imageKey]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    }



    function handleUpdateLog(){
        const updateLog: Log = {
            ...log,
            logsDes: formData.logsDes,
            employeeID: formData.employeeID,
            batchCode: formData.batchCode,
            logImage: formData.logImage,

        };

        onUpdateLog(updateLog);
        setModalOpen(false);

    }

    function handleDeleteLog() {
        console.log("Deleting log with logCodesssssssssssssssssss:", log.logID);
        if (!log.logID) {
            console.error("Error: logCode is undefined");
            return;
        }
        onDeleteLog(log);
        setModalOpen(false);
    }


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
                    <h1 className="text-center text-xl font-semibold mb-5"> View Log Details</h1>
                    <div
                        className={"overflow-y-auto h-[56vh] p-4 custom-scrollbar"}
                    >
                        {log.logImage && (
                            <img
                                src={log.logImage}
                                alt="Preview"
                                className="rounded-lg mb-10 shadow-xl object-cover z-50 w-full h-64"
                            />
                        )}
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
                                        <option
                                            value={employee.employeeID}>{employee.employeeID} / {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="batchCode" className="block text-sm font-medium text-gray-900">Production
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
                                    <option value="" disabled>Select Production</option>
                                    {products.map((production) => (
                                        <option value={production.batchCode}>{production.batchCode} / {production.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Observation */}
                        <div className="mb-6">
                            <label
                                htmlFor="logsDes"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Observation
                            </label>
                            <textarea
                                id={'logsDes'}
                                value={formData.logsDes}
                                name="logsDes"
                                className="mt-2 block w-full h-[20vh] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        {/*update image*/}
                        <div id="file-upload-container" className="relative mb-2">
                            <label
                                htmlFor="file"
                                className={`flex flex-col items-center justify-center ${formData.logImage ? "hidden" : "block"} bg-gray-300 p-10 rounded-2xl border-2 border-dashed border-gray-500 shadow-xl cursor-pointer hover:bg-gray-200 transition-all`}
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
                                    onChange={(e) => handleFileUpload(e, "observedImage")}
                                />
                            </label>
                            {formData.logImage && (
                                <img
                                    src={formData.logImage}
                                    alt="Preview"
                                    className="rounded-lg shadow-xl object-cover z-50 w-full h-64"
                                />
                            )}
                        </div>
                    </div>
                    {/* Modal Footer */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-semibold">
                        <button
                            onClick={handleUpdateLog}
                            className="bg-green-600 w-full rounded-lg py-2 text-white hover:bg-green-700 focus:outline-none"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDeleteLog}
                            className="bg-red-600 w-full rounded-lg py-2 text-white hover:bg-red-700 focus:outline-none"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setModalOpen(false);

                            }}
                            className="bg-gray-300 w-full rounded-lg py-2 text-black hover:bg-gray-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default LogActions;