import MedlabLogo from "../resource/img/LogoWhite.png";

export function Menubar() {
  return (
    <div className="container h-100 p-0 m-0 col-12" style={{backgroundColor:"var(--dark-blue)"}}>
      <div className="logo row col-12 h-20 d-flex flex-row align-items-center justify-content-center  m-0 pl-3">
        <div className="col-lg-5 col-mb-4 col-sm-12 ">
          <img
            src={MedlabLogo}
            alt="Medlab Logo"
            className="img-fluid  p-0"
          />
        </div>
        <div className="col-7 col-mb-8 col-sm-d-none d-flex align-items-center">
         <h2 className="fw-bolder m-0 text-white">MEDLAB</h2>
        </div>
      </div>
      <div className="Menu row col-12 m-0 p-0" style={{height:"85%"}}>
        <ul className="bg-white px-2 pt-3">
          <li className="bg-blue">Dashboard</li>
          <li>Dashboard</li>
          <li>Dashboard</li>
          <li>Dashboard</li>
          <li>Dashboard</li>
        </ul>
      </div>
      <div className="logout h-10">Logout</div>
    </div>
  );
}
