import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {AppDispatch} from "../store/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import { Employee } from "../model/Employee.ts";
import {deleteEmployee, getAllEmployees, saveEmployee, updateEmployee} from "../slice/EmployeeSlice.ts";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal.tsx";
import AddEmployee from "../components/saveModel/AddEmployee.tsx";
import ViewEmployee from "../components/viewModel/ViewEmployee.tsx";
import UpdateEmployee from "../components/updateModel/UpdateEmployee.tsx";
import TableData from "../components/TableData.tsx";

export function EmployeePage() {

    const employeeHeaders = ['Name', 'Role', 'Email', 'Contact No', 'Address', 'Actions'];
    const dispatch = useDispatch<AppDispatch>();  // A hook to access the dispatch function from the Redux store


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen,setIsUpdateModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const renderEmployeRow = (employee?: Employee) => {
        if (!employee) return <div className={"p-2"}>Invalid Employee Data</div>;
        return (
            <>
                <div className="p-2 truncate">{employee.firstName} ,{employee.lastName}</div>
                <div className="p-2 truncate">{employee.role}</div>
                <div className="p-2 hidden sm:block truncate">{employee.email}</div>
                <div className="p-2 truncate">{employee.contactNo}</div>
                <div className="p-2 truncate">{employee.addressLine01} {employee.addressLine02}</div>
            </>
        );
    };

    function handleAddEmployee(newEmployee: Employee) {
        console.log("Empage",newEmployee);
        dispatch(saveEmployee(newEmployee));
        setIsModalOpen(false);
        toast.success('Employee saved successfully');
    }

    function handleViewEmploy(employee:Employee) {
        setSelectedEmployee(employee);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(employee: Employee) {
        setSelectedEmployee(employee);
        setIsUpdateModalOpen(true);
    }

    function handleUpdateEmployee(employee: Employee) {
        dispatch(updateEmployee(employee));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-blue-500"></i>
                <span>Employee updated successfully!</span>
            </div>,
            { icon: false }
        );

    }

    const employeeMember : Employee[] = useSelector((state:  {employee:Employee[]} ) => state.employee);



    function handleDeleteEmploy(employee:Employee){

        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(deleteEmployee(employee.employeeID));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Staff deleted successfully!</span>
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
        if (!employeeMember || employeeMember.length === 0) {
            dispatch(getAllEmployees());
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
                    Employees Management
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
                <AddEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSave={handleAddEmployee}/>

                {selectedEmployee && (
                    <ViewEmployee
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        employee={selectedEmployee}
                    />
                )}

                {selectedEmployee && (
                    <UpdateEmployee
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        employee={selectedEmployee}
                        onUpdate={handleUpdateEmployee}
                    />
                )}

                {/*table*/}
                <TableData data={employeeMember} headers={employeeHeaders} renderRow={renderEmployeRow}
                           handleView={handleViewEmploy} handleUpdate={openUpdateModal} handleDelete={handleDeleteEmploy}
                ></TableData>

            </div>



        </motion.div>
    );

}
