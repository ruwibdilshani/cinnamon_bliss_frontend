import {motion} from "framer-motion";

interface DeleteModalProps {
    visible: boolean;
    onDelete: () => void;
    onCancel: () => void;
}

function DeleteModal({ visible, onDelete, onCancel }: Readonly<DeleteModalProps>) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center mt-[45vh]"
            initial={{ opacity: 0 }} // Initial fade-in for the overlay
            animate={{ opacity: visible ? 1 : 0 }} // Fade-in/out animation
            exit={{ opacity: 0 }} // Fade-out on close
            transition={{ duration: 0.3 }} // Smooth transition for the background
        >
            {/* Background overlay */}
            <motion.div
                className="absolute inset-0 bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: visible ? 0.5 : 0 }} // Fade-in to 50% opacity
                exit={{ opacity: 0 }} // Fade-out on close
                transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth easing for the overlay
            ></motion.div>

            {/* Modal content */}
            <motion.div
                className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[30vw]"
                initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and faded out
                animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.8, // Zoom-in animation
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
                <h1 className="text-center text-xl font-bold mb-4 text-gray-800">Are you sure?</h1>
                <div className="text-center p-4">
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="group-hover:animate-bounce w-16 h-16 flex items-center justify-center text-red-500 mx-auto mb-8"
                    >
                        <path
                            clipRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            fillRule="evenodd"
                        />
                    </svg>
                    <p className="font-medium text-sm text-gray-600 px-4">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                </div>

                {/* Buttons Section */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 font-semibold">
                    <div>
                        <button
                            onClick={onDelete}
                            className="w-full bg-red-600 rounded-lg py-2 px-4 text-white hover:bg-red-700 focus:outline-none transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={onCancel}
                            className="w-full bg-gray-300 rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default DeleteModal;
