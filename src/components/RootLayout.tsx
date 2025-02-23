
import {Navigate, Outlet} from "react-router-dom";
import Navigation from "./Navigation.tsx";
import {Header} from "./Header.tsx";
import {useSelector} from "react-redux";



export function RootLayout() {
    const userFullName = "Ruwi Dil";
    const userRole = "Role";


    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);


    if (!isAuthenticated) {
        return <Navigate to="/signIn" replace/>;
    }



    return (
        <div className="flex h-screen">
            <Navigation/>

            <div className="flex-1 flex flex-col ml-0 md:ml-80">
                <Header userFullName={userFullName} userRole={userRole}/>
                <main className="flex-1 pt-20 p-4 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}