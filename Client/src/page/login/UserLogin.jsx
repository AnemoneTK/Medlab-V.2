import { Link } from "react-router-dom";

export function UserLogin() {
  return (
    <>
      <div className="row col-12 d-flex flex-column justify-content-center align-items-center m-0 p-0">
        <div
          className="col-lg-4 col-md-4 col-sm-12 d-flex flex-column justify-content-center align-items-center rounded-3 "
          style={{ backgroundColor: "var(--blue)" }}
        >
          <Link to="/" className="row col-12 align-items-start text-white">
            <i className="fa-solid fa-arrow-left fs-2 mt-4 "></i>
          </Link>
          <div className="row col-12 mt-3 ">
            <i
              className="col-12 fa-solid fa-address-card my-3 d-flex flex-column justify-content-center align-items-center text-white"
              style={{ fontSize: "5rem" }}
            ></i>
            <p className="col fw-bold fs-1 mb-3 d-flex flex-column justify-content-center align-items-center text-white">
              เข้าสู่ระบบพนักงาน
            </p>
          </div>
          <div className="row my-5 col-12 d-flex flex-column justify-content-center align-items-center">
            <form
              action="./method/loginOfficeDB.php"
              id="LoginFrom"
              method="POST"
              className="d-flex flex-column justify-content-center align-items-center w-75"
            >
              <div className="row col-12">
                <div className="form-label text-white fs-4 fw-normal">รหัสประจำตัว</div>
                <input
                  type="text"
                  className="form-control "
                  name="username"
                  placeholder="กรุณากรอกรหัสประจำตัว"
                  id="username"
                />
              </div>
              <div className="row col-12 mb-5 mt-3">
                <label className="form-label text-white fs-4 fw-normal">รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  id="password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark btn-lg text-warp w-100"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
