import teacraftlogo from '../assets/img/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import {Link} from "react-router-dom";

function Navigation({ isOpen}) {
    const [activeItem, setActiveItem] = useState('home');
    const [isMenuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'Home', icon: 'fa-house', path: '/home' },
        { id: 'home', label: 'Home', icon: 'fa-house', path: '/home' },
        { id: 'home', label: 'Home', icon: 'fa-house', path: '/home' },





        { id: 'logout', label: 'Logout', icon: 'fa-right-from-bracket', path: '/logout' },
    ];

    return (
        <div className="relative z-50">
            {/* Burger Button */}
            {!isMenuOpen && (
                <button
                    className="md:hidden fixed top-4 left-4 z-30 text-gray-500 hover:text-green-700   "
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <i className={`fas ${isMenuOpen ? '' : 'fa-bars-staggered '} text-2xl`}></i>
                </button>
            )}
            {/* Sidebar */}
            <aside
                className={`bg-brown-500 shadow-md fixed z-40 h-full transition-transform transform ${
                    isMenuOpen || isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-80`}
            >
                <div className="p-6 ml-2 flex justify-between items-center mt-3">
                    <img src={teacraftlogo} alt="logo" className="h-12 object-cover drop-shadow mr-2"  />
                    <p className={ '  flex justify-center text-2xl font-bold text-brown-50 '}>CINNAMON BLISS</p>
                    <button
                        className="md:hidden text-gray-500 hover:text-green-700"
                        onClick={() => setMenuOpen(false)}
                    >
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <nav className="p-4 mt-6 space-y-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            id={`${item.id}-btn`}
                            onClick={() => {
                                setActiveItem(item.id);
                                setMenuOpen(false);
                            }}
                            className={`flex items-center text-base font-medium rounded text-sm md:text-base lg:text-lg w-full py-2 pl-3 transition-all ${
                                activeItem === item.id
                                    ? 'bg-brown-400 text-brown-50'
                                    : 'text-gray-700 hover: bg-brown-600 hover: text-brown-50'
                            } ${item.id === 'logout' ? 'fixed bottom-8' : '' } `}
                        >
                            <i
                                className={`fas ${item.icon} mr-3 text-lg md:text-xl lg:text-2xl py-2 ${
                                    activeItem === item.id ? 'text-green-700' : ''
                                } `}
                            ></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    );
}

export default Navigation;
