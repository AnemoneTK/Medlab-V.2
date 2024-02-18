export function TopNav() {
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
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

    </>
  );
}
