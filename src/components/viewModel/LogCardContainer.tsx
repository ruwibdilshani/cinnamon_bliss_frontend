
import {useDispatch, useSelector} from "react-redux";
import {Employee} from "../../model/Employee.ts";
import {Log} from "../../model/Log.ts";
import {Product} from "../../model/Product.ts";
import {useEffect} from "react";
import {getAllProducts} from "../../slice/ProductSlice.ts";
import {getAllEmployees} from "../../slice/EmployeeSlice.ts";



interface LogCardContainerProps {
    onCardClick: (logs: Log) => void;
    logs: Log[];
}

function LogCardContainer({ logs,onCardClick }: Readonly<LogCardContainerProps>) {

    const products : Product[] = useSelector((state:  {product:Product[]} ) => state.product);
    const employeeMember : Employee[] = useSelector((state: { employee:Employee[]}) => state.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
        if (!employeeMember || employeeMember.length === 0) {
            dispatch(getAllEmployees());
        }
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 " id="logContainer">
            {logs.map((log, index) => (


                <div
                    key={index}
                    className="bg-white bg-green-200 border border-gray-200 rounded-xl h-96 shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
                    onClick={() => onCardClick(log)}
                >

                    {log.logImage && (
                        <img
                            src={log.logImage}
                            alt="Observation"
                            className="w-full h-40 object-cover rounded-t-xl"
                        />
                    )}
                    <div
                        className={`p-4 px-6 bg-green-200 flex flex-col flex-grow ${!log.logImage ? "rounded-t-xl" : ""}`}
                    >
                        <div className="max-h-32 overflow-y-auto">
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-500">Production: </span>
                                <span className="font-medium text-sm text-gray-700">
        {products.find((production) => production.batchCode === log.batchCode)?.name || "Unknown production"}
      </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-500">Employee: </span>
                                <span className="font-medium text-sm text-gray-700">
        {employeeMember.find((employee) => employee.employeeID === log.employeeID)?.firstName || "Unknown employee"}
      </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-500">Observation: </span>
                                <span className="font-medium text-sm text-gray-700">
        {log.logsDes || "No observation provided"}
      </span>
                            </p>
                        </div>

                        <p className="text-xs text-black font-bold mt-auto">
                            {log.logDate ? new Date(log.logDate).toLocaleDateString() : "Unknown date"}
                        </p>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default LogCardContainer;
