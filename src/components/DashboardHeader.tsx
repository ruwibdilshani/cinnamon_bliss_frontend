import { useEffect, useState } from "react";
import axios from "axios";

const DashboardHeader = () => {

    const [greeting, setGreeting] = useState("Good Morning!");
    const [weatherText, setWeatherText] = useState("Fetching weather...");
    const [weatherEmoji, setWeatherEmoji] = useState("☀️");

    // Function to fetch weather data using Open-Meteo API
    const fetchWeather = async () => {
        try {
            // Latitude and longitude for Colombo or other cities
            const locationMap: { [key: string]: { latitude: number; longitude: number } } = {
                Colombo: { latitude: 6.9271, longitude: 79.8612 },
            };
            const { latitude, longitude } = locationMap["Colombo"];

            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

            const response = await axios.get(apiUrl);
            const data = response.data.current_weather;
            const temp = Math.round(data.temperature);
            const weatherCode = data.weathercode;

            setWeatherEmoji(getWeatherEmoji(weatherCode));
            setWeatherText(`${temp}° | ${getWeatherDescription(weatherCode)}`);
        } catch (error) {
            console.error("Failed to fetch weather data", error);
            setWeatherText("Unable to fetch weather data.");
        }
    };

    function getWeatherDescription(weatherCode: number) {
        if ([0, 1].includes(weatherCode)) return "Clear sky";
        if ([2, 3].includes(weatherCode)) return "Partly cloudy or overcast";
        if ([45, 48].includes(weatherCode)) return "Foggy";
        if ([51, 53, 55].includes(weatherCode)) return "Drizzle";
        if ([61, 63, 65].includes(weatherCode)) return "Rain";
        if ([71, 73, 75].includes(weatherCode)) return "Snowfall";
        if ([80].includes(weatherCode)) return "Heavy rain";
        if ([95, 96, 99].includes(weatherCode)) return "Thunderstorm";
        return "Default";
    }

    // Function to determine the weather emoji based on Open-Meteo weather codes
    const getWeatherEmoji = (weatherCode: number) => {
        if ([0, 1].includes(weatherCode)) return "☀️"; // Clear sky
        if ([2, 3].includes(weatherCode)) return "☁️"; // Partly cloudy or overcast
        if ([45, 48].includes(weatherCode)) return "🌫️"; // Foggy
        if ([51, 53, 55].includes(weatherCode)) return "🌦️"; // Drizzle
        if ([61, 63, 65].includes(weatherCode)) return "🌧️"; // Rain
        if ([71, 73, 75].includes(weatherCode)) return "❄️"; // Snowfall
        if ([80].includes(weatherCode)) return "🌧️"; // Heavy rain
        if ([95, 96, 99].includes(weatherCode)) return "⛈️"; // Thunderstorm
        return "🌈"; // Default
    };

    // Function to set the greeting based on the time
    const updateGreeting = () => {
        const now = new Date();
        const hours = now.getHours();
        if (hours >= 5 && hours < 12) {
            setGreeting("Good Morning!");
        } else if (hours >= 12 && hours < 17) {
            setGreeting("Good Afternoon!");
        } else if (hours >= 17 && hours < 21) {
            setGreeting("Good Evening!");
        } else {
            setGreeting("Good Night!");
        }
    };

    useEffect(() => {
        updateGreeting();
        fetchWeather().then(r => r);
    }, []);

    return (
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-6">
            <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1" id="greeting-txt">
                    {greeting}
                </h1>
                <p className="text-amber-800 text-xs sm:text-sm lg:text-base">
                    Optimize Your Operations with Real-Time Insights
                </p>
            </div>
            <div className="flex items-center bg-amber-600 text-gray-800 px-4 py-2 rounded-lg">
                <span className="mr-2 text-2xl sm:text-xl lg:text-2xl" id="weather-emoji">
                    {weatherEmoji}
                </span>
                <p id="weather-txt" className="font-medium text-xs sm:text-sm lg:text-base">
                    {weatherText}
                </p>
            </div>
        </header>
    );
};

export default DashboardHeader;
