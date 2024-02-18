// import { Outlet } from "react-router";
// import { SideNav } from "../../components/SideNav";
import { Menubar } from "../../components/Menubar";

export function UserLayout() {
  return (
    <>
      <div className="warper col-12 bg-gray d-flex flex-row justify-content-start align-items-start">
        {/* <div className="col m-0 p-0 bg-black" >
          <SideNav /> 
        </div>
        <div className="h-100 bg-white d-flex" style={{width:"87dvw"}}>
          <Outlet />
        </div> */}
        <div className="row col-2 bg-white h-100 p-0 m-0">
        <Menubar/>
        </div>
      </div>
    </>
  );
}
