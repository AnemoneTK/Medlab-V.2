import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SelectRole } from './page/login/SelectRole.jsx';
import { AdminLogin } from './page/login/AdminLogin.jsx';
import { UserLogin } from './page/login/UserLogin.jsx';
import { UserLayout } from "./page/user/UserLayout/UserLayout.jsx";
import { Dashboard } from "./page/user/Dashboard/Dashboard.jsx";
import { Warehouse } from "./page/user/Warehouse.jsx";
import { ShowAllProduct } from "./page/user/ShowAllProduct.jsx";
import { AddNewProduct } from "./page/user/AddNewProduct.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectRole />,
  },
  {
    path: "adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "userLogin",
    element: <UserLogin />,
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "allProduct",
        element: <ShowAllProduct/>,
      },
      {
        path: "addNewProduct",
        element: <AddNewProduct/>,
      },
      {
        path: "warehouse",
        element: <Warehouse />,
      },
    ],
  },
]);


function App() {
  return (
    <>
    <div className="container col-12">
     <RouterProvider router={router}/>
    </div>
    </>
  );
}

export default App;
