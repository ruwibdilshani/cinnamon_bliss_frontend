import {motion} from "framer-motion";

import {useDispatch, useSelector} from "react-redux";

import toast from "react-hot-toast";


import {useEffect, useState} from "react";

import {AppDispatch} from "../store/store.tsx";
import DeleteModal from "../components/DeleteModal.tsx";

import TableData from "../components/TableData.tsx";
import {Vehicle} from "../model/Vehicle.ts";
import {deleteVehicle, getAllVehicles, saveVehicle, updateVehicle} from "../slice/VehicleSlice.ts";
import ViewVehicle from "../components/viewModel/ViewVehicle.tsx";
import UpdateVehicle from "../components/updateModel/UpdateVehicle.tsx";
import AddVehicle from "../components/saveModel/AddVehicle.tsx";


export function VehiclePage() {
    const vehicleMember : Vehicle[] = useSelector((state:  {vehicle:Vehicle[]} ) => state.vehicle);

    const vehicleHeaders = ['LicensePlate','Model', 'Capacity', 'Available', 'EmployeeID','Action'];
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

    const renderVehicleRow = (vehicle: Vehicle) => (
        <>
            <div className="p-2 truncate">{vehicle.licensePlate}</div>
            <div className="p-2 hidden sm:block truncate">{vehicle.model}</div>
            <div className="p-2 truncate">{vehicle.capacity}</div>

            {/* Availability Check */}
            <div className={` p-2 truncate font-semibold ${vehicle.available ? "text-green-600" : "text-red-600"}`}>
                {vehicle.available ? "Available" : "Unavailable"}
            </div>

            {/* Employee Allocation Check */}
            <div className={`p-2 truncate font-semibold ${vehicle.employeeID ? "text-green-600" : "text-red-600"}`}>
                {vehicle.employeeID ? "Allocated" : "Not Allocated"}
            </div>
        </>
    );



    function handleAddVehicle(newVehicle: Vehicle) {
        console.log("handleAddVehicl",newVehicle);
        dispatch( saveVehicle(newVehicle));
        setIsModalOpen(false);
        toast.success('Vehicle saved successfully');
    }

    function handleViewVehicle(vehicle:Vehicle) {
        setSelectedVehicle(vehicle);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(vehicle: Vehicle) {
        setSelectedVehicle(vehicle);
        setIsUpdateModalOpen(true);
    }

    function handleUpdateVehicle(vehicle: Vehicle) {
        dispatch(updateVehicle(vehicle));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-blue-500"></i>
                <span>Vehicle updated successfully!</span>
            </div>,
            { icon: false }
        );

    }


    function handleDeleteVehicle(vehicle:Vehicle){
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(deleteVehicle(vehicle.vehicleID));

                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Vehicle deleted successfully!</span>
                        </div>,
                        { icon: false }
                    );
                }}
                onCancel={() => {
                    toast.dismiss(t.id);
                }}
            />
        ));
    }
    useEffect(() => {
        if (!vehicleMember || vehicleMember.length === 0) {
            dispatch(getAllVehicles());
        }
    }, [dispatch]);

    return (
        <motion.div
            initial={{
                opacity: 0,  // Start invisible
            }}
            animate={{
                opacity: 1,  // Fade in to full visibility
            }}
            exit={{
                opacity: 0,  // Fade out
            }}
            transition={{
                duration: 0.8,  // Duration for the fade effect
                ease: [0.25, 0.8, 0.5, 1],  // Smooth easing curve
            }}
        >
            <div className="container mx-auto p-5">
                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Vehicle Management
                </h1>

                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-5">
                    <button
                        id="btn-add"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>
                <AddVehicle isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSave={handleAddVehicle}/>

                { selectedVehicle && (
                    <ViewVehicle
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        vehicle={selectedVehicle}
                    />
                )}

                { selectedVehicle && (
                    <UpdateVehicle
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        vehicle={selectedVehicle}
                        onUpdate={handleUpdateVehicle}
                    />
                )}

                {/*table*/}
                <TableData data={vehicleMember} headers={vehicleHeaders} renderRow={renderVehicleRow}
                           handleView={handleViewVehicle} handleUpdate={openUpdateModal} handleDelete={handleDeleteVehicle}
                ></TableData>

            </div>



        </motion.div>
    );
}