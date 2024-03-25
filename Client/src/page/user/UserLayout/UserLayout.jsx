import { useEffect, useState } from "react";
import { Logo } from "../../../components/Logo";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Dropdown, Space } from "antd";
import { MenuList } from "../../../components/MenuList";
import { Outlet } from "react-router";
import { Notification } from "../../../components/Notification";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const items = [
  {
    label: <Link to="/" className="btn w-100 text-red fw-bold fs-5 p-0">ยืนยันออกจากระบบ</Link>,
  },
];

export function UserLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch("http://localhost:3000/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "OK") {
          sessionStorage.clear()
          window.location = "/";
        }
      });
  }, []);


 
  
  return (
    <Layout style={{ height: "100dvh", position: "relative" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <MenuList />
        <div
          className="btn-group dropup col-12 m-0 p-0 "
          style={{ position: "absolute", bottom: "0px" }}
        >
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="btn btn-secondary rounded-0"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space >
                <i className="bi bi-box-arrow-left fs-4"></i>
                <span className={(collapsed ? "d-none" : "d-block")}>
                  ออกจากระบบ
                </span>
              </Space>
            </a>
          </Dropdown>
        </div>
      </Sider>
      <Layout>
        <Header
          className="d-flex flex-row justify-content-between align-items-center"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Notification />
        </Header>
        <Content
          style={{
            margin: "20px 15px",
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
