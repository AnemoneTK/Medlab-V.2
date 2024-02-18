import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import "./App.css";

import { SelectRole } from "./page/login/SelectRole";
import { AdminLogin } from "./page/login/AdminLogin";
import { UserLogin } from "./page/login/UserLogin";
import { UserLayout } from "./page/user/Layout";
import { Dashboard } from "./page/user/Dashboard/Dashboard";
// import { Layout } from "./page/user/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SelectRole/>
    },
    {
      path: "adminLogin",
      element: <AdminLogin/>
    },
    {
      path: "userLogin",
      element: <UserLogin/>
    },
    {
      path: "user",
      element: <UserLayout/>,
      children:[
        {
          path: "dashboard",
          element: <Dashboard/>
        }
      ]
    },
  ]);
  return (
    <>
      <div className="warper">
        <RouterProvider router={router}/>
      </div>
    </>
  );
}

export default App;
