import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store.tsx";
import { loginUser } from "../slice/auth-user-slice.ts";
import { useNavigate } from "react-router";
import image from "../assets/img/pngegg (8).png";
import teacraftlogo from '../assets/img/logo.png';
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);

    const [formData, setFormData] = useState({
        email: "",
        confirmPass: "",

    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


            const user: { password: string; email: string } = { email: formData.email, password: formData.confirmPass };
            dispatch(loginUser(user));
            toast.success('SignIn');

    };

    useEffect(() => {
        if (isAuthenticated) {
            console.log("User is authenticated, redirecting to home page...");
            navigate("/home");
        }
    }, [isAuthenticated]);

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
                duration: 1,  // Duration for the fade effect
                ease: [0.25, 0.8, 0.5, 1],  // Smooth easing curve
            }}
        >
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-brown-300 to-brown-700">
                <div className="bg-white p-8 rounded-xl flex max-w-6xl ">

                    {/* Right Section - Image */}
                    <div className="w-1/2 object-cover flex items-center rounded-l-xl bg-brown-300 ">
                        <img
                            src={image} // Update the path with your actual image location
                            alt="sign Management"
                            className="object-cover rounded-r-xl mr-20"
                        />
                    </div>

                    {/* Image positioned at the top-right */}
                    <div className="absolute top-0 right-0 p-8 ">
                        <img
                            src={teacraftlogo} // Update the path with your actual image location
                            alt="Sign Up Illustration"
                            className="w-16 h-16 object-contain"
                        />
                    </div>

                    {/* Left Section - Form */}
                    <div className="w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in your account</h2>
                        <p className="text-gray-500 mb-6">"Sign in to start managing factory !"</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
                                    required
                                />
                            </div>

                            {/*<div>*/}
                            {/*    <label className="block text-gray-700 font-semibold mb-1">Password</label>*/}
                            {/*    <input*/}
                            {/*        type="password"*/}
                            {/*        name="password"*/}
                            {/*        value={formData.password}*/}
                            {/*        onChange={handleChange}*/}
                            {/*        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"*/}
                            {/*        required*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className="pb-10">
                                <label className="block text-gray-700 font-semibold mb-1"> Password</label>
                                <input
                                    type="password"
                                    name="confirmPass"
                                    value={formData.confirmPass}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-500 text-white p-3 rounded-lg hover:bg-amber-900 transition"
                            >
                                Sign in
                            </button>
                        </form>

                        <p className="text-gray-600 mt-4 text-center">
                            Don't have an account? <a onClick={() => navigate("/signUp")} className="text-brown-600 font-medium">Sign up</a> Now.
                        </p>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default SignUp;
