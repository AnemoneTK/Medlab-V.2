export function Notification(){
    return(
        <ul className="navbar-nav me-3">
            <li className="nav-item dropdown mr-2">
              <a className="nav-link p-0 m-0" data-toggle="dropdown" href="#">
                <i className="far fa-bell fs-4 position-relative"></i>
                <span className="position-absolute badge translate-middle rounded-pill bg-danger text-center" style={{top:"20px"}}>10</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0">
                <span className="dropdown-header p-0">List</span>
                <div className="dropdown-divider"></div>

                <a className="dropdown-item py-0">
                  <i className="fa-solid fa-box"></i> ยาเหลือน้อย
                  <span className="float-right text-muted font-weight-bold">20</span>
                </a>
                <a className="dropdown-item py-0">
                  <i className="fa-solid fa-calendar-days"></i> ยาใกล้หมดอายุ
                  <span className="float-right text-muted font-weight-bold">20</span>
                </a>
              </div>
            </li>
          </ul>
    )
}