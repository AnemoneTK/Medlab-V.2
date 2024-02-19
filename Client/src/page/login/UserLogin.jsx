import { Link } from "react-router-dom";

export function UserLogin() {
  return (
    <>
        <div
          className="row h-auto col-lg-4 col-md-4 col-sm-12 d-flex flex-column justify-content-start align-items-center rounded-3 "
          style={{ backgroundColor: "var(--blue)" }}
        >
          <div className="row h-auto mt-4">
            <Link to="/">
              <i className="fa-solid fa-arrow-left fs-2 text-white"></i>
            </Link>
          </div>
          <div className="row my-3">
            <i
              className="col-12 fa-solid fa-address-card d-flex flex-column justify-content-center align-items-center text-white"
              style={{ fontSize: "7rem" }}
            ></i>
            <div className="col fw-bold fs-2 d-flex flex-column justify-content-center align-items-center text-white">
              เข้าสู่ระบบพนักงาน
            </div>
          </div>

          <div className="row my-3">
            <form
              action="./method/loginOfficeDB.php"
              id="LoginFrom"
              method="POST"
              className="row h-auto d-flex flex-column justify-content-center align-items-center"
            >
              <div className="row">
                <div className="form-label text-white fs-4 fw-normal">
                  รหัสประจำตัว
                </div>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="username"
                  placeholder="กรอกรหัสประจำตัว"
                  id="username"
                  required
                />
              </div>
              <div className="row mt-3">
                <label className="form-label text-white fs-4 fw-normal">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  placeholder="กรอกรหัสผ่าน"
                  id="password"
                  required
                />
              </div>
              <div className="row mt-5 mb-3">
              <button type="submit" className="col-12 btn btn-dark btn-lg">
                เข้าสู่ระบบ
              </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
