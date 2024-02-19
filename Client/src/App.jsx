import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SelectRole } from './page/login/SelectRole.jsx';
import { AdminLogin } from './page/login/AdminLogin.jsx';
import { UserLogin } from './page/login/UserLogin.jsx';
import { UserLayout } from "./page/user/UserLayout.jsx";
import { Dashboard } from "./page/user/Dashboard/Dashboard.jsx";
import { Warehouse } from "./page/user/Warehouse.jsx";


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
