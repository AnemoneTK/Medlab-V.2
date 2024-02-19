import { Link } from "react-router-dom";
import "./login.css";

export function SelectRole() {
  return (
    <>
      <div
        className="container col-12 d-flex flex-column justify-content-between align-items-center py-5 m-0 h-100"
        style={{ backgroundColor: "var(--dark-blue)" }}
      >
        <div className="container h-auto">
          <div className="row align-items-center h-auto">
            <div className="fw-bold text-center text-white fs-1">
              Warehouse Monitoring
            </div>
            <div className="row align-items-center h-auto">
              <div className="fw-bold col-12 text-center text-white fs-3">
                ระบบบริการจัดการคลัง
              </div>
            </div>
          </div>
        </div>

        <div className="container h-auto" >
          <div className="row col-12 d-flex justify-content-center align-items-center p-2">
            <div className="col-lg-4 col-md-6 col-sm-10">
              <Link
                to="/userLogin"
                className="card text-center rounded-3 py-5 shadow-lg mx-2"
              >
                <i
                  className="fa-regular fa-address-card col-lg-my-5 col-md-my-5 col-sm-my-3"
                  style={{ fontSize: "7rem", color: "var(--blue)" }}
                ></i>
                <div className="userText text-center fw-bold fs-1">พนักงาน</div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10">
              <Link
                to="/adminLogin"
                className="card text-center rounded-3 py-5 shadow-lg mx-2"
              >
                <i
                  className="fa-solid fa-database col-lg-my-5 col-md-my-5 col-sm-my-3"
                  style={{ fontSize: "7rem", color: "var(--green)" }}
                ></i>
                <div className="adminText text-center fw-bold fs-1">ผู้ดูแล</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <Link to="/" className="help text-white fs-5">
            แจ้งปัญหาการใช้งาน
          </Link>
        </div>
      </div>
    </>
  );
}
