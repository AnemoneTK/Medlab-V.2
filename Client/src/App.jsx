import { Route, Routes} from "react-router-dom";

import './App.css'
import { SelectRole } from "./page/login/SelectRole";
import { AdminLogin } from "./page/login/AdminLogin";
import { UserLogin } from "./page/login/UserLogin";

function App() {
  

  return (
    <>
      <div className="warper">
          <Routes>
            <Route path="/" element={<SelectRole/>} />
            <Route path="adminLogin" element={<AdminLogin/>} />
            <Route path="userLogin" element={<UserLogin/>} />
          </Routes>
      </div>
    </>
  )
}

export default App
