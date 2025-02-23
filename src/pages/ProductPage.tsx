import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {RootState} from "../store/store.tsx";
import {useEffect, useState} from "react";
import {Product} from "../model/Product.ts";
import {deleteProduct, getAllProducts, saveProduct, updateProduct} from "../slice/ProductSlice.ts";
import DeleteModal from "../components/DeleteModal.tsx";
import ProductViewContainer from "../components/viewModel/ProductViewContainer.tsx";
import AddProduct from "../components/saveModel/AddProduct.tsx";
import ProductAction from "../components/updateModel/ProductAction.tsx";


function LogPage() {

    const dispatch = useDispatch();
    const products : Product[] = useSelector((state:  RootState ) => state.product);
    const [selectedField, setIsSelectedField] = useState<Product | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);



    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch]);


    function handleAddProduct(newProduct :Product) {
        console.log("NEW LOAGSSS", newProduct);
        dispatch(saveProduct(newProduct));
        setIsAddModalOpen(false);
        toast.success('produc Added Successfully');
    }

    function openLogActionsModal(product: Product) {
        setIsSelectedField(product);
        setIsActionModalOpen(true);
    }

    function handleUpdateProduct(product: Product) {
        dispatch(updateProduct(product));
        setIsActionModalOpen(false);
        toast.success('product Updated Successfully');
    }

    function handleDeleteProduct(product: Product) {
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    console.log("LOGSddddddddddddddd", product.batchCode);
                    dispatch(deleteProduct(product.batchCode));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Product deleted successfully!</span>
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
                    <ProductViewContainer
                        products={products}
                        onCardClick={openLogActionsModal}
                    />
                </div>

                <AddProduct
                    isModalOpen={isAddModalOpen}
                    setIsModalOpen={setIsAddModalOpen}
                    onSave={handleAddProduct}
                />
                {/*modal for log actions*/}
                {selectedField && (
                    <ProductAction
                        isModalOpen={isActionModalOpen}
                        setModalOpen={setIsActionModalOpen}
                        product={selectedField}
                        onUpdateLog={handleUpdateProduct}
                        onDeleteLog={handleDeleteProduct}
                    />
                )}
            </div>
        </motion.div>
    );
}

export default LogPage;