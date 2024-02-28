import { useState } from "react";
import { Logo } from "../../../components/Logo";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { MenuList } from "../../../components/MenuList";
import { Outlet } from "react-router";
import { Notification } from "../../../components/Notification";
import { LogoutBtn } from "../../../components/LogoutBtn";
const { Header, Sider, Content } = Layout;

export function UserLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100dvh", position:"relative"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <MenuList />
        <LogoutBtn/>
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
          <Notification/>
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
