import teacraftlogo from '../assets/img/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import {Link} from "react-router-dom";

function Navigation({ isOpen}) {
    const [activeItem, setActiveItem] = useState('home');
    const [isMenuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'Home', icon: 'fa-house', path: '/home' },
        { id: 'employee', label: 'Employee', icon: 'fa-user', path: '/employee' },
        { id: 'supplier', label: 'Supplier', icon: 'fa-truck', path: '/supplier' },
        { id: 'product', label: 'Product', icon: 'fa-box', path: '/product' },
        { id: 'cinnamonStock', label: 'Stock', icon: 'fa-warehouse', path: '/stock' },
        { id: 'vehicle', label: 'Vehicle', icon: 'fa-car', path: '/vehicle' },
        { id: 'log', label: 'Add Log', icon: 'fa-file-alt', path: '/log' },






        { id: 'logout', label: 'Logout', icon: 'fa-right-from-bracket', path: '/logout' },
    ];

    return (
        <div className="relative z-50">
            {/* Burger Button */}
            {!isMenuOpen && (
                <button
                    className="  md:hidden fixed top-4 left-4 z-30 hover:text-green-700   "
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <i className={ `fas ${isMenuOpen ? '' : 'fa-bars-staggered '} text-2xl  `}></i>
                </button>
            )}
            {/* Sidebar */}
            <aside
                className={` bg-[#864000] shadow-md fixed z-40 h-full transition-transform transform ${
                    isMenuOpen || isOpen ? 'translate-x-0 ' : '-translate-x-full'
                } md:translate-x-0 w-80`}
            >
                <div className=" p-6 ml-2 flex justify-between items-center mt-3">
                    <img src={teacraftlogo} alt="logo" className="h-12 object-cover drop-shadow mr-2"  />
                    <p className={ '  flex justify-center text-2xl font-bold text-white  '}>CINNAMON BLISS</p>
                    <button
                        className="md:hidden text-black hover:text-amber-950  "
                        onClick={() => setMenuOpen(false)}
                    >
                        <i className=" fas fa-times text-2xl"></i>
                    </button>
                </div>
                <nav className="mt-10 p-4 space-y-8 flex flex-col h-full ">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            id={`${item.id}-btn`}
                            onClick={() => {
                                setActiveItem(item.id);
                                setMenuOpen(false);
                            }}
                            className={`flex items-center font-medium rounded  md:text-base lg:text-lg w-full py-2 pl-3 transition-all ${
                                activeItem === item.id
                                    ? 'bg-gray-100 text-amber-950'
                                    : 'text-white  hover:bg-gray-100 hover:text-amber-950'
                            } ${item.id === 'logout' ? 'fixed max-w-72 align-bottom  bottom-5 ' : '' } `}
                        >
                            <i
                                className={`fas ${item.icon} mr-3 text-lg md:text-xl lg:text-2xl py-2 ${
                                    activeItem === item.id ? 'text-amber-950' : ''
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
