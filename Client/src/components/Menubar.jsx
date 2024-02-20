import MedlabLogo from "../resource/img/LogoWhite.png";

export function Menubar() {
  return (
    <>
    <div className="row d-flex p-0 m-0" style={{backgroundColor:"var(--dark-blue)", height:"100dvh"}}>
      <div className="logo row col-12 d-flex flex-row align-items-center justify-content-center border-bottom" >
        <div className="col-lg-5 col-mb-4 col-sm-12 ">
          <img
            src={MedlabLogo}
            alt="Medlab Logo"
            className="img-fluid"
          />
        </div>
        <div className="col-7 col-mb-8 col-sm-d-none d-flex align-items-center">
         <h3 className="fw-bold m-0 text-white">MEDLAB</h3>
        </div>
      </div>

      <div className="Menu col-12 m-0 p-0" style={{height:"85%"}}>
        <ul className="">
          <li className="bg-blue">Dashboard</li>
          <li>Dashboard</li>
          <li>Dashboard</li>
          <li>Dashboard</li>
          <li>Dashboard</li>
        </ul>
      </div>
      <div className="logout h-10">Logout</div>
    </div>
    </>
  );
}
