export function SideNav() {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a className="brand-link d-flex align-items-center">
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
              <a>ยืนยันออกจากระบบ</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
