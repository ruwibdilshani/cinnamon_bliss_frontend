import profileIcon from "../assets/icons/profile.png"

export function Header({ userFullName, userRole }) {



    return (
        <header
            className="bg-white p-4 flex justify-between items-center fixed top-0 left-0 sm:left-80 right-0 z-10 h-16">
            <div className="flex space-x-4 mt-3">
                <div className="relative hidden md:block group ml-4">
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

            {/* Right Section */}
            <div className="flex items-center space-x-4 pr-4 group cursor-pointer">
                <img
                    src={profileIcon}
                    alt="Profile"
                    className="w-10 h-10 rounded-full duration-150 group-hover:border-2 group-hover:border-green-500"
                />
                <div className="flex flex-col mr-4 group-hover:text-green-500">
                    <span
                        id="userFullName"
                        className="font-semibold text-sm md:text-base duration-300 group-hover:text-green-500"
                    >
                        {userFullName}
                    </span>
                    <p
                        id="userRole"
                        className="text-xs text-gray-600 md:text-sm duration-300 group-hover:text-gray-500"
                    >
                        {userRole}
                    </p>
                </div>
            </div>
        </header>
    );
}