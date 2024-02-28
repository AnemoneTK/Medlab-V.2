import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    label: <Link to="/">ยืนยันออกจากระบบ</Link>,
    key: "0",
  },
];

export function LogoutBtn() {
  return (
    // <div className="btn-group dropup col-12 m-0 p-0 " style={{position:"absolute", bottom:"0px"}}>
    //   <button
    //     type="button"
    //     className="btn btn-secondary dropdown-toggle rounded-0 py-2 d-flex align-items-center justify-content-center"
    //     data-bs-toggle="dropdown"
    //     aria-expanded="false"
    //   >
    //     <i className="bi bi-box-arrow-left pe-3 fs-4"></i>ออกจากระบบ
    //   </button>
    //   <ul className="dropdown-menu col-12 rounded-0 bg-red ">
    //     <li className="col-12 d-flex align-items-center">
    //       <Link to="" className="col-12 text-white text-center fw-bold">ยืนยันออกจากระบบ</Link>
    //     </li>
    //   </ul>
    // </div>
    <div
      className="btn-group dropup col-12 m-0 p-0 "
      style={{ position: "absolute", bottom: "0px" }}
    >
      <Dropdown menu={{ items }} trigger={["click"]} className="">
        <a onClick={(e) => e.preventDefault()}>
          <Space className="">
            <i className="bi bi-box-arrow-left pe-3 fs-4"></i>ออกจากระบบ
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
