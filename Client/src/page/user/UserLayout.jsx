import { Outlet } from "react-router";
import { SideNav } from "../../components/SideNav";

export function UserLayout() {
  return (
    <>
      <div className="warper bg-gray d-flex flex-row justify-content-start align-items-start">
        <div className="col m-0 p-0 bg-black" >
          <SideNav /> 
        </div>
        <div className="h-100 bg-white d-flex" style={{width:"85dvw"}}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
