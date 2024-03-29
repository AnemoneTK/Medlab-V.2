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
import React from "react";
import { AllUser } from "./page/admin/AllUser.jsx";
import { AdminLayout } from "./page/admin/AdminLayout.jsx";
import { Purchase } from "./page/user/Purchase.jsx";


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
      {
        path: "purchase",
        element: <Purchase />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "showAllUser",
        element: <AllUser/>,
      },
    ],
  },
]);


class App extends React.Component {
  // componentDidMount () {
  //   const script = document.createElement("script")
  //   script.src = 'table.js'
  //   script.async= true
  //   document.body.appendChild(script)
  // }
  
  render(){
    return (
      <>
      <div className="container col-12">
       <RouterProvider router={router}/>
      </div>
      </>
    );
  }
  
}

export default App;
