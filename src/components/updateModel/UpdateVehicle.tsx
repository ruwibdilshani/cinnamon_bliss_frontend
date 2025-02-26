import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import {Vehicle} from "../../model/Vehicle.ts";
import {} from "../../util/util.ts";
import {Employee} from "../../model/Employee.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.tsx";


interface UpdateModalProps{
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onUpdate: (updateVehicle: Vehicle) => void;
    vehicle:Vehicle;
}

function UpdateVehicle({ isModalOpen, setIsModalOpen, onUpdate, vehicle}: Readonly<UpdateModalProps>)  {

    const employeeMember : Employee[] = useSelector((state: RootState ) => state.employee);

    const [formData, setFormData] = useState({
        licensePlate: vehicle.licensePlate,
        model: vehicle.model,
        capacity: vehicle.capacity,
        available: vehicle.available,
        employeeID: vehicle.employeeID,
    });

    useEffect(() => {
        setFormData({
            licensePlate: vehicle.licensePlate,
            model: vehicle.model,
            capacity: vehicle.capacity,
            available: vehicle.available,
            employeeID: vehicle.employeeID
        });
    }, [isModalOpen]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            available: name === "employeeID" && (value === "" || value === "None") ? true : false,
        }));
    }


    function handleUpdate() {
        console.log("Update",formData);

        const updatedVehicle = {
            ...vehicle,
            model: formData.model,
            capacity: formData.capacity,
            available: formData.available,
            employeeID: formData.employeeID,
        };
        onUpdate(updatedVehicle);
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
                    className="bg-amber-100 rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
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

                    <h1 className="text-center text-xl font-semibold mb-5">Add Vehicle</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="licenseplate" className="block text-sm font-medium text-gray-900">LicensePlate No</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="licensePlate"
                                        id="licenseplate"
                                        value={formData.licensePlate}
                                        onChange={handleInputChange}
                                        readOnly={true}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="model" className="block text-sm font-medium text-gray-900">Last
                                    name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="model"
                                        id="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-900">Capacity</label>
                                <div className="mt-2">
                                    <select
                                        name="capacity"
                                        id="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Select Capacity</option>
                                        <option value="5Kg">5Kg</option>
                                        <option value="10Kg">10Kg</option>
                                        <option value="15Kg">15Kg</option>
                                        <option value="25Kg">25Kg</option>
                                        <option value="30Kg">30Kg</option>
                                        <option value="40Kg">40Kg</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3 py-5">
                                <label htmlFor="employeeID" className="block text-sm font-medium text-gray-900">Employee
                                    ID</label>
                                <div className="mt-2">
                                    <select
                                        name="employeeID"
                                        id="employeeID"
                                        value={
                                            formData.employeeID ? formData.employeeID : "Not Allocated"
                                        }
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Select Supplier</option>
                                        <option value="None" >None</option>

                                        {employeeMember.map((employee) => (
                                            <option value={employee.employeeID}>{employee.employeeID}- {employee.firstName} {employee.lastName}
                                            </option>
                                        ))}
                                    </select>
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

export default UpdateVehicle;
