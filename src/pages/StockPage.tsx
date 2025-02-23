import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.tsx";
import {formatDate} from "../util/util.ts";
import {CinnamonStock} from "../model/CinnamonStock.ts";
import {deleteCinnamonStock, getAllCinnamonStock, saveCinnamonStock, updateCinnamonStock} from "../slice/StockSlice.ts";
import AddCinnamonStock from "../components/saveModel/AddCinnamonStock.tsx";
import ViewCinnamonStock from "../components/viewModel/ViewCinnamonStock.tsx";
import {Supplier} from "../model/Supplier.ts";
import DeleteModal from "../components/DeleteModal.tsx";
import TableData from "../components/TableData.tsx";
import UpdateCinnamonStock from "../components/updateModel/UpdateCinnamonStock.tsx";



export function StockPage() {

    const cinnamonStock : CinnamonStock [] = useSelector((state: RootState) => state.cinnamonStock)
    const supplierMember : Supplier[] = useSelector((state : RootState) => state.supplier)

        const stockCinnamonHeaders = ['StockID', 'Supplier', 'Quantity/KG', 'Total (Rs)', 'Received Date', 'Actions'];

    const dispatch  = useDispatch<AppDispatch>()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCinnmonStock, setSelectedStockMaterial] = useState<CinnamonStock | null>(null);


    const renderStockRow = (cinnamonStocks?: CinnamonStock) => {

        if (!cinnamonStocks) return <div className={"p-2"}>Invalid Raw Material Data</div>;
        return (
            <>
                <div className="p-2 truncate">{cinnamonStocks.stockID}</div>
                <div className="p-2 truncate">{
                    supplierMember.filter((supplier) => supplier.supplierID === cinnamonStocks.supplierID).map((filteredSupplier) => {
                        return filteredSupplier.supplierID +" / "+filteredSupplier.firstName + " / " + filteredSupplier.lastName;
                    })
                }</div>
                <div className="p-2 truncate">{cinnamonStocks.quantity}</div>
                <div className="p-2 truncate">{cinnamonStocks.total}</div>
                <div className="p-2 truncate">{formatDate(cinnamonStocks.receivedDate)}</div>
            </>
        );
    };


    function handleAddStocks(newStock : CinnamonStock) {
        console.log("Supp",newStock);
        dispatch(saveCinnamonStock(newStock));
        setIsModalOpen(false);
        toast.success('stock saved successfully');
    }

    function handleViewStock(newStock : CinnamonStock) {
        setSelectedStockMaterial(newStock);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(newStock : CinnamonStock) {
        setSelectedStockMaterial(newStock);
        setIsUpdateModalOpen(true);
    }

    function handleUpdateStockMaterial(newStock : CinnamonStock) {
        console.log("Empagwwwwwwwwwe",newStock);
        dispatch(updateCinnamonStock(newStock));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-blue-500"></i>
                <span>Stock updated successfully!</span>
            </div>,
            { icon: false }
        );
    }


    useEffect(() => {
        if (!cinnamonStock || cinnamonStock.length === 0) {
            dispatch(getAllCinnamonStock());
        }
    }, [dispatch]);





    function handleDeleteStocks(newStock : CinnamonStock) {
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(deleteCinnamonStock(newStock.stockID));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>stock deleted successfully!</span>
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
                    Row Material Management
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

                <AddCinnamonStock isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSave={handleAddStocks}/>

                {selectedCinnmonStock && (
                    <ViewCinnamonStock
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        cinnamonStock={selectedCinnmonStock}
                    />
                )}

                {selectedCinnmonStock && (
                    <UpdateCinnamonStock
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        cinnamonStock={selectedCinnmonStock}
                        onUpdate={handleUpdateStockMaterial}
                    />
                )}

                {/*table*/}
                <TableData data={cinnamonStock} headers={stockCinnamonHeaders} renderRow={renderStockRow}
                           handleView={handleViewStock} handleUpdate={openUpdateModal} handleDelete={handleDeleteStocks}
                ></TableData>
            </div>


        </motion.div>
    );
}




