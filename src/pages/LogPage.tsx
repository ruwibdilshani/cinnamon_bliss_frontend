import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import toast from "react-hot-toast";
import {Log} from "../model/Log.ts";
import {RootState} from "../store/store.tsx";
import {deleteLog, getAllLogs, saveLog, updateLog} from "../slice/LogsSlice.ts";
import DeleteModal from "../components/DeleteModal.tsx";
import LogCardContainer from "../components/viewModel/LogCardContainer.tsx";
import AddLog from "../components/saveModel/AddLog.tsx";
import LogActions from "../components/updateModel/LogActions.tsx";


function LogPage() {

    const dispatch = useDispatch();
    const logs : Log[] = useSelector((state:  RootState ) => state.log);
    const [selectedField, setIsSelectedField] = useState<Log | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);



    useEffect(() => {
        if (!logs || logs.length === 0) {
            dispatch(getAllLogs());
        }
    }, [dispatch]);


    function handleAddLog(newLog :Log) {
        console.log("NEW LOAGSSS", newLog);
        dispatch(saveLog(newLog));
        setIsAddModalOpen(false);
        toast.success('Log Added Successfully');
    }

    function openLogActionsModal(log: Log) {
        setIsSelectedField(log);
        setIsActionModalOpen(true);
    }

    function handleUpdateLog(log: Log) {
        dispatch(updateLog(log));
        setIsActionModalOpen(false);
        toast.success('Log Updated Successfully');
    }

    function handleDeleteLog(logs: Log) {
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    console.log("LOGSddddddddddddddd", logs.logID);
                    dispatch(deleteLog(logs.logID));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Log deleted successfully!</span>
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

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.8, 0.5, 1],
            }}
        >
            <div className="container mx-auto p-3 ">

                <div className="flex space-x-4 mt-3">
                    <div className="relative hidden md:block group mb-4">
                        <input
                            id="search-bar"
                            type="text"
                            placeholder="Search here..."
                            name="text"
                            className="w-[20vw] pl-10 pr-4 py-2 rounded-xl  border-2 border-gray-300 opacity-80 focus:opacity-100 focus:w-[24vw] transition-all duration-200 ease-in-out outline-none hover:border-green-500 focus:border-green-500 group-hover:border-green-500"
                        />
                        <i className="fa fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 group-hover:text-green-500"></i>
                    </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Log Management
                </h1>
                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-8">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>
                <div className={'h-[70vh] overflow-y-scroll custom-scrollbar'}>
                    <LogCardContainer
                        logs={logs}
                        onCardClick={openLogActionsModal}
                    />
                </div>

                <AddLog
                    isModalOpen={isAddModalOpen}
                    setIsModalOpen={setIsAddModalOpen}
                    onSave={handleAddLog}
                />
                {/*modal for log actions*/}
                {selectedField && (
                    <LogActions
                        isModalOpen={isActionModalOpen}
                        setModalOpen={setIsActionModalOpen}
                        log={selectedField}
                        onUpdateLog={handleUpdateLog}
                        onDeleteLog={handleDeleteLog}
                    />
                )}
            </div>
        </motion.div>
    );
}

export default LogPage;