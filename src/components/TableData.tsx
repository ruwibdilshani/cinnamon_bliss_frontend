import * as React from "react";



interface DataTableProps {
    data: any[];
    headers: string[];
    actions?: boolean;
    renderRow: (item: any) => React.ReactNode;
    handleView?: (item: any) => void;
    handleUpdate?: (item: any) => void;
    handleDelete?: (item: any) => void;
}



function DataTable({ headers, data,actions= true, renderRow, handleView, handleUpdate, handleDelete }: Readonly<DataTableProps>) {
    return (
        <div className="overflow-x-auto">
            {/* Table Header */}
            <div
                className={`grid grid-cols-2 sm:grid-cols-${headers.length} gap-2 bg-brown-500 text-center font-semibold text-xs sm:text-sm text-brown-50 p-2 rounded-t-xl`}>
                {headers.map((header, index) => (
                    <div
                        key={index}
                        className="p-2 truncate flex items-center justify-center group  cursor-pointer overflow-hidden whitespace-nowrap">
                        <span>{header}</span>
                    </div>
                ))}
            </div>

            {/* Table Body */}
            <div className="h-[64vh] table-scroll overflow-y-auto staff-table-body relative ">
                {data.length < 1 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 col-span-full">
                        No data available
                    </div>
                ) : (
                    data.map((item, index) => (
                        <div
                            key={item.id || index}
                            className=" bg-brown-100  table-row grid grid-cols-2 sm:grid-cols-6 gap-2 text-center bg-gray-100 font-medium text-xs sm:text-sm hover:bg-green-100 p-3 cursor-pointer rounded-lg mt-1 transition-all">

                            {/* Render row based on passed `renderRow` function */}
                            {renderRow(item)}

                            {/* Optional Actions (view, update, delete) */}
                            {actions && (
                                <div className="p-2 flex justify-center space-x-0 sm:space-x-2 md:space-x-2 lg:space-x-6 text-[#183153]">
                                    <button id="view-icon" className="px-4 sm:px-2 text-gray-500 rounded-lg transition-all"
                                            onClick={() => handleView?.(item)}
                                        >
                                        <i className="fa fa-eye text-base hover:text-green-500"></i>
                                    </button>
                                    <button id="update-icon" className="px-4 sm:px-2 text-gray-500 rounded-lg transition-all"
                                            onClick={() => handleUpdate?.(item)}
                                    >
                                        <i className="fa-solid fa-pen text-base hover:text-blue-500"></i>
                                    </button>
                                    <button id="delete-icon" className="px-4 sm:px-2 text-gray-500 rounded-lg transition-all"
                                            onClick={() => handleDelete?.(item)}
                                    >
                                        <i className="fa-solid fa-trash text-base hover:text-red-500"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DataTable;
