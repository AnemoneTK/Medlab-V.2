import { Menu } from "antd";
import {
  AreaChartOutlined,
  InboxOutlined,
  PrinterOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export function MenuList() {
  const [withdraw, setWithdraw] = useState(false);
  const [purchase, setPurchase] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/authen", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "error") {
          window.location = "/";
        } else {
          setWithdraw(() => data[0].withdraw);
          setPurchase(() => data[0].purchase);
        }
      });
  }, []);

  return (
    <Menu
      theme="dark"
      mode="inline"
      className="d-flex flex-column mt-3"
      style={{
        height: "88dvh",
        gap: "15px",
        fontSize: "1rem",
        marginTop: "2rem",
        position: "relative",
      }}
      // defaultSelectedKeys={['Dashboard']}
    >
      <Menu.Item key="Dashboard" icon={<AreaChartOutlined className="fs-5" />}>
        <Link to="dashboard">ภาพรวม</Link>
      </Menu.Item>
      <Menu.SubMenu
        key="medicine"
        icon={<i className="bi bi-capsule-pill fs-5"></i>}
        title="จัดการคลังยา"
      >
        <Menu.Item key="allProduct">
          <Link to="allProduct">รายการยาทั้งหมด</Link>
        </Menu.Item>
        <Menu.Item key="addProduct">เพิ่มยาจากคำสั่งซื้อ</Menu.Item>
        <Menu.Item key="addNewProduct" className="d-none">
          <Link to="addNewProduct">เพิ่มยาใหม่</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="warehouse" icon={<InboxOutlined className="fs-5" />}>
        <Link to="warehouse">ตำแหน่งจัดเก็บ</Link>
      </Menu.Item>
      <Menu.SubMenu
        key="print" icon={<PrinterOutlined className="fs-5" />}
        title="ออกเอกสาร"
      >
        <Menu.Item key="exportProduct">
          <Link to="allProduct">เอกสารรายการยา</Link>
        </Menu.Item>
        <Menu.Item key="purchase" className={purchase ==1 ? "d-block" : "d-none"}>
          <Link to="purchase">ออกใบสั่งซื้อ</Link>
        </Menu.Item>
        <Menu.Item key="export" className={withdraw ==1 ? "d-block" : "d-none"}>
          <Link to="allProduct">ออกใบเบิก</Link>
        </Menu.Item>
      </Menu.SubMenu>
      
      <Menu.Item key="history" icon={<HistoryOutlined className="fs-5" />}>
        ประวัติ
      </Menu.Item>
    </Menu>
  );
}
