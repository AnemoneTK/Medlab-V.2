import { Link } from "react-router-dom";
import './login.css'

export function SelectRole() {
  return (
    <>
      <div
        className="col-12 d-flex flex-column justify-content-around align-items-center py-4 m-0 h-100"
        style={{ backgroundColor: "var(--dark-blue)" }}
      >
        <div className="row align-items-center p-0 m-0">
          <div
            className="fw-bold col-12 text-center text-white"
            style={{ fontSize: "3rem"}}
          >
            Warehouse Monitoring
          </div>
          <div
            className="fw-bold col-12 text-center text-white"
            style={{ fontSize: "1.6rem" }}
          >
            ระบบบริการจัดการคลัง
          </div>
        </div>

        <div className="row col-6 d-flex flex-row justify-content-around align-items-center p-0 m-0">
          <div className="col-lg-6 col-md-4 col-sm-4 ">
            <Link to="/userLogin"
              className="card text-center rounded-3 py-5 shadow-lg mx-2"
            >
              <i
                className="fa-regular fa-address-card my-5"
                style={{ fontSize: "7rem", color:"var(--blue)" }}
              ></i>
              <div className="text-center fw-bold fs-1">พนักงาน</div>
            </Link>
          </div>
          <div className="col-lg-6 col-md-5 col-sm-8">
            <Link to="/adminLogin"
              className="card text-center rounded-3 py-5 shadow-lg mx-2"
            >
              <i
                className="fa-solid fa-database my-5"
                style={{ fontSize: "7rem", color:"var(--green)" }}
              ></i>
              <div className="text-center fw-bold fs-1">ผู้ดูแล</div>
            </Link>
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
