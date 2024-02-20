import { Link } from "react-router-dom";
import MedlabLogo from "../resource/img/LogoWhite.png";
export function SideNav() {
  return (
    <>
      <nav className="col-10  navbar navbar-expand navbar-white navbar-light" style={{maxHeight:"3rem"}}  >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown mr-2">
            <a className="nav-link" data-toggle="dropdown">
              <i className="far fa-bell"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-header">Notifications</span>
              <div className="dropdown-divider"></div>

              <div className="dropdown-divider"></div>
              <a className="dropdown-item">
                <i className="fa-solid fa-box"></i> ยาเหลือน้อย
                <span className="float-right text-muted font-weight-bold"></span>
              </a>
              <a className="dropdown-item">
                <i className="fa-solid fa-calendar-days"></i> ยาใกล้หมดอายุ
                <span className="float-right text-muted font-weight-bold"></span>
              </a>
            </div>
          </li>
        </ul>
      </nav>

      <aside
        className="main-sidebar sidebar-dark-primary"
        style={{ height: "100dvh" }}
      >
        <a className="brand-link d-flex align-items-center justify-content-center p-0 m-0">
          <img
            src={MedlabLogo}
            alt="Medlab Logo"
            className="img-fluid col-4 p-0"
          />
          <span className="font-weight-Bold ml-2 fs-4">MEDLAB</span>
        </a>

        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar flex-column mb-auto"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <Link to="dashboard" className="nav-item">
                <a className="nav-link activeMenu" id="menu">
                  <i className="nav-icon fa-solid fa-chart-area"></i>
                  <p>ภาพรวม</p>
                </a>
              </Link>

              {/* Inventory Start  */}
              <li className="nav-item">
                <a className="nav-link headDropdown" id="hd">
                  <i className="nav-icon fa-solid fa-pills"></i>
                  <p>
                    จัดการคลังยา
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item ">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>รายการยาทั้งหมด</p>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>เพิ่มยาจากคำสั่งซื้อ</p>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>เพิ่มยาใหม่</p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- Inventory End --> */}

              {/* <!-- warehouse Start --> */}
              <li className="nav-item">
                <Link to="warehouse" className="nav-link" id="menu">
                  <i className="nav-icon fa-solid fa-warehouse"></i>
                  <p>ตำแหน่งจัดเก็บ</p>
                </Link>
              </li>
              {/* <!-- warehouse End --> */}

              {/* <!-- Report Start --> */}
              <li className="nav-item">
                <a className="nav-link headDropdown" id="hd">
                  <i className="nav-icon fa-solid fa-print"></i>
                  <p>
                    ออกเอกสารรายงาน
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>คำขอสั่งซื้อ</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>การเบิกยา</p>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ยาทั้งหมด</p>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ตำแหน่งจัดเก็บ</p>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ยาที่จำนวนเหลือน้อย</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ยาที่ใกล้หมดอายุ</p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- Report End --> */}

              {/* <!-- History Start --> */}
              <li className="nav-item">
                <a className="nav-link headDropdown" id="hd">
                  <i className="nav-icon fa-solid fa-clock-rotate-left "></i>
                  <p>
                    ประวัติการดำเนินการ
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ประวัติการสั่งซื้อยา</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ประวัติการเบิกออก</p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- History End --> */}
            </ul>
          </nav>

          <div className="btn-group dropup w-100">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle text-center"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mx-2 "></i>
              ออกจากระบบ
            </button>
            <div className="dropdown-menu align-items-center text-center w-100">
              <a>ยืนยันออกจากระบบ</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
