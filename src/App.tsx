

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {Toaster} from "react-hot-toast";


import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import {RootLayout} from "./components/RootLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Error} from "./components/Error.tsx";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {SupplierPage} from "./pages/SupplierPage.tsx";
import {StockPage} from "./pages/StockPage.tsx";
import {VehiclePage} from "./pages/VehiclePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import LogPage from "./pages/LogPage.tsx";

function App() {
  const routes = createBrowserRouter([


    {
      path: '',
      element: <RootLayout/>,
      children: [
        {path: '/home', element: <Home/>},
          {path: '/employee', element: <EmployeePage/>},
          {path: '/supplier', element: <SupplierPage/>},
          {path: '/product', element: <ProductPage/>},
          {path: '/stock', element: <StockPage/>},
          {path: '/vehicle', element: <VehiclePage/>},
          {path: '/log', element: <LogPage/>},



        {path: '*', element: <Error/>}

      ]
    },

  ]);

  return (
      <>
        <Toaster position={"top-center"}/>
        <Provider store={store}>
          <RouterProvider router={routes}/>
        </Provider>
      </>
  );


}

export default App

