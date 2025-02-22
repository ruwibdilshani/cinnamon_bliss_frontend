import {motion} from "framer-motion";

import {useDispatch, useSelector} from "react-redux";

import toast from "react-hot-toast";


import {useEffect, useState} from "react";

import {AppDispatch, RootState} from "../store/store.tsx";
import {Supplier} from "../model/Supplier.ts";
import DeleteModal from "../components/DeleteModal.tsx";
import {deleteSupplier, getAllSuppliers, saveSupplier, updateSupplier} from "../slice/SupplierSlice.ts";
import AddSupplier from "../components/saveModel/AddSupllier.tsx";
import ViewSupplier from "../components/viewModel/ViewSupplier.tsx";
import UpdateSupplier from "../components/updateModel/UpdateSupplier.tsx";
import TableData from "../components/TableData.tsx";


export function SupplierPage() {
    const supplierMember : Supplier[] = useSelector((state:  RootState ) => state.supplier);

    const supplierHeaders = ['Code','Name', 'Email', 'Address', 'Contact No', 'Actions'];
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

    const renderSupplierRow = (supplier: Supplier) => (
        <>
            <div className="p-2 truncate">{supplier.supplierID}</div>
            <div className="p-2 truncate">{supplier.firstName} {supplier.lastName}</div>
            <div className="p-2 hidden sm:block truncate">{supplier.email}</div>
            <div className="p-2 truncate">{supplier.addressLine1}</div>
            <div className="p-2 truncate">{supplier.contactNo}</div>

        </>
    );

    function handleAddSupplier(newSupplier: Supplier) {
        dispatch( saveSupplier(newSupplier));
        setIsModalOpen(false);
        toast.success('Supplier saved successfully');
    }

    function handleViewSupllier(supplier:Supplier) {
        setSelectedSupplier(supplier);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(supplier: Supplier) {
        setSelectedSupplier(supplier);
        setIsUpdateModalOpen(true);
    }

    function handleUpdateSupplier(supplier: Supplier) {
        dispatch(updateSupplier(supplier));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-blue-500"></i>
                <span>Supplier updated successfully!</span>
            </div>,
            { icon: false }
        );

    }

    function handleDeleteSupplier(supplier:Supplier){
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(deleteSupplier(supplier.supplierID));

                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Supplier deleted successfully!</span>
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
        if (!supplierMember || supplierMember.length === 0) {
            dispatch(getAllSuppliers());
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
                    Supplier Management
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
                <AddSupplier isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSave={handleAddSupplier}/>

                { selectedSupplier && (
                    <ViewSupplier
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        supplier={selectedSupplier}
                    />
                )}

                { selectedSupplier && (
                    <UpdateSupplier
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        supplier={selectedSupplier}
                        onUpdate={handleUpdateSupplier}
                    />
                )}

                {/*table*/}
                <TableData data={supplierMember} headers={supplierHeaders} renderRow={renderSupplierRow}
                           handleView={handleViewSupllier} handleUpdate={openUpdateModal} handleDelete={handleDeleteSupplier}
                ></TableData>

            </div>



        </motion.div>
    );
}