

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {Toaster} from "react-hot-toast";


import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import {RootLayout} from "./components/RootLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Error} from "./components/Error.tsx";







function App() {


  const routes = createBrowserRouter([


    {
      path: '',
      element: <RootLayout/>,
      children: [
        {path: '/home', element: <Home/>},



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

