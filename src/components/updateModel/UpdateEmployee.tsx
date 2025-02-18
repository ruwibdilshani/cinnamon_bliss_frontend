import {useEffect, useState} from "react";
import { motion } from "framer-motion";

import {formatDate} from "../../util/util.ts";
import {Employee} from "../../model/Employee.ts";
import * as React from "react";

interface UpdateModalProps{
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onUpdate: (updatedEmployee: Employee) => void;
    employee:Employee;
}

function UpdateEmployee({ isModalOpen, setIsModalOpen, onUpdate, employee}: Readonly<UpdateModalProps>)  {
    const [formData, setFormData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
        joinedDate: formatDate(employee.joinedDate),
        gender: employee.gender,
        dob: formatDate(employee.dob),
        contactNumber: employee.contactNo,
        email: employee.email,
        streetAddress: employee.addressLine01,
        addressLine2: employee.addressLine02,
        country: employee.addressLine03,
        province: employee.addressLine04,
        city: employee.addressLine05,
        postalCode: employee.postalCode,
    });

    useEffect(() => {
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            joinedDate: formatDate(employee.joinedDate),
            gender: employee.gender,
            dob: formatDate(employee.dob),
            contactNumber: employee.contactNo,
            email: employee.email,
            streetAddress: employee.addressLine01,
            addressLine2: employee.addressLine02,
            country: employee.addressLine03,
            province: employee.addressLine04,
            city: employee.addressLine05,
            postalCode: employee.postalCode,
        });
    }, [isModalOpen]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleUpdate() {
        const updatedStaff = {
            ...employee,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            gender: formData.gender,
            joinedDate: new Date(formData.joinedDate).toISOString(),
            dob: new Date(formData.dob).toISOString(),
            streetAddress: formData.streetAddress,
            addressLine2: formData.addressLine2,
            country: formData.country,
            province: formData.province,
            city: formData.city,
            postalCode: formData.postalCode,
            contactNumber: formData.contactNumber,
            email: formData.email,

        };
        onUpdate(updatedStaff);
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
                    className="bg-brown-100 rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
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

                    <h1 className="text-center text-xl font-semibold mb-5">Add Employee Member</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">
                        {/* First Name and Last Name */}`
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">First
                                    name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="first-name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">Last
                                    name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="last-name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Designation and Gender */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-900">Role</label>
                                <div className="mt-2">
                                    <select
                                        name="role"
                                        id="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Select Designation</option>
                                        <option value="Packagers">Packagers</option>
                                        <option value="Marketing & Sales Staff ">Marketing & Sales Staff </option>
                                        <option value="Quality Control Inspectors">Quality Control Inspectors</option>
                                        <option value="Packaging Workers">Packaging Workers</option>
                                        <option value="Harvesting Workers">Harvesting Workers</option>
                                        <option value="Stock Transfer Drivers">Stock Transfer Drivers</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="gender"
                                       className="block text-sm font-medium text-gray-900">Gender</label>
                                <div className="mt-2">
                                    <select
                                        name="gender"
                                        id="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Date of Birth and Contact Number */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-900">Date of
                                    Birth</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="contact-number" className="block text-sm font-medium text-gray-900">Contact
                                    Number</label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        id="contact-number"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email and Role */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-900">Street
                                    Address</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        id="street-address"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="address-line-2" className="block text-sm font-medium text-gray-900">Address
                                    Line 2</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        id="address-line-2"
                                        value={formData.addressLine2}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Country, Province, City */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="country"
                                       className="block text-sm font-medium text-gray-900">Country</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="country"
                                        id="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="province"
                                       className="block text-sm font-medium text-gray-900">Province</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="province"
                                        id="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-900">City</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Postal Code and Joined Date */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-900">Postal
                                    Code</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postalCode"
                                        id="postal-code"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="joined-date" className="block text-sm font-medium text-gray-900">Joined
                                    Date</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="joinedDate"
                                        id="joined-date"
                                        value={formData.joinedDate}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
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
                                    onClick={handleUpdate}
                                    className="bg-orange-600 w-full rounded-lg py-2 px-4 text-white hover:bg-orange-700 focus:outline-none"
                                >
                                    Update
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

export default UpdateEmployee;
