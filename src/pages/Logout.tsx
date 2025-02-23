import { useState } from "react";
import { useDispatch } from "react-redux";
import {logOutUser} from "../slice/auth-user-slice.ts"; // Assuming you're using Redux

export default function LogoutPopup() {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOutUser()); // Dispatch the logout action
        setOpen(false); // Close the confirmation popup after logout
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold text-center mb-4">Confirm Logout</h2>
                        <p className="text-gray-600 mb-4 text-center">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-4">
                            {/* Cancel Button */}
                            <button
                                onClick={() => setOpen(false)}
                                className="bg-green-100 text-black px-4 py-2 rounded-md hover:bg-green-200"
                            >
                                Cancel
                            </button>
                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
