import React, { useState, useEffect } from "react";

const RealTimeCalendar: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className=" flex-col items-center justify-center  " >
            <div className="bg-amber-300 p-6 rounded-2xl shadow-xl text-center w-80  h-52">
                <h2 className="text-1xl font-bold text-gray-700">📅 Calendar</h2>
                <p className="text-1xl text-gray-600 mt-2">
                    {currentTime.toLocaleDateString("en-US", { weekday: "long" })}
                </p>
                <p className="text-3xl font-semibold mt-2 text-blue-600">
                    {currentTime.toLocaleDateString()}
                </p>
                <p className="text-xl text-gray-800 mt-2">
                    🕒 {currentTime.toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

export default RealTimeCalendar;
