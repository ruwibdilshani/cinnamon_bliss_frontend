import { motion } from "framer-motion";

import {Supplier} from "../../model/Supplier.ts";



interface ViewSupllierProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    supplier: Supplier;
}

function ViewSupplier({ isOpenModal, setIsOpenModal, supplier }: Readonly<ViewSupllierProps>) {
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
                    className="bg-amber-100 rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isOpenModal ? 1 : 0, scale: isOpenModal ? 1 : 0.8 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">View Staff Member</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2 font-medium">
                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900"> Code</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplier.supplierID}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">First name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplier.firstName}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Last name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplier.lastName}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Gender</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplier.gender}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Date of Birth and Contact Number */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Contact Number</label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        value={supplier.contactNo}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email and Role */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        value={supplier.email}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Address</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplier.addressLine01}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Postal Code and Joined Date */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Postal Code</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={supplier.postalCode}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
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

export default ViewSupplier;
