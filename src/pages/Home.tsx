import DashboardHeader from "../components/DashboardHeader.tsx";
import RealTimeCalendar from "../components/CalenderTime.tsx";
import MaterialProcessChart from "../components/MaterialProcessChart.tsx";
import EmployeeWidget from "../components/EmployeeWidget.tsx";

export function Home() {
    return (
        <div className="container mx-auto p-5 bg-amber-100 ">
            <DashboardHeader/>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  ">
                <RealTimeCalendar/>
                {/*<MaterialProcessChart isModel={'pie'}/>*/}
                <MaterialProcessChart isModel={'column'} isType={'stock'} />
                <MaterialProcessChart isModel={'pie'} isType={'product'} />
            </div>
            <div className="grid  grid-cols-1 lg:grid-cols-1 gap-6 mt-36 ">
                <EmployeeWidget/>

            </div>
        </div>
    );
}