export function UserLayout() {
  return (
    <>
      <div className="warper col-12 d-flex flex-column justify-content-center align-items-center">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              role="button"
            >
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

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a  className="brand-link d-flex align-items-center">
          {/* <img
            alt="Medlab Logo"
            className=" img-fluid"
          /> */}
          <span className="brand-text font-weight-Bold ml-2">MEDLAB</span>
        </a>

        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar flex-column mb-auto"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a className="nav-link activeMenu" id="menu">
                  <i className="nav-icon fa-solid fa-chart-area"></i>
                  <p>ภาพรวม</p>
                </a>
              </li>

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
                <a className="nav-link" id="menu">
                  <i className="nav-icon fa-solid fa-warehouse"></i>
                  <p>ตำแหน่งจัดเก็บ</p>
                </a>
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
              <a >ยืนยันออกจากระบบ</a>
            </div>
          </div>
        </div>
      </aside>

      <div
        className="content-wrapper iframe-mode"
        data-widget="iframe"
        data-loading-screen="750"
      >
      </div>

      <div className="main-footer d-flex justify-content-between align-items-center p-1">
        <div className="copyright px-2">
          <strong>
            Copyright &copy; 2014-2021{" "}
            <a href="https://adminlte.io">AdminLTE.io</a>.
          </strong>{" "}
          All rights reserved.
        </div>
        <div className="d-none d-sm-inline px-2">
          <img
            src="../resource/img/IT_logo.png"
            alt="Medlab Logo"
            className="img-fluid mx-2"
          />
          <img
            src="../resource/img/SPU_logo.png"
            alt="Medlab Logo"
            className="img-fluid mx-2"
          />
        </div>
      </div>
      </div>
    </>
  );
}
