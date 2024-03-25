import { Layout, Menu } from "antd";
import { Logo } from "../../components/Logo";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const { Header, Content } = Layout;
const items = [
  {
    key: 1,
    label: (
      <Link to="" className="btn w-100 text-white fw-bold fs-5 p-0">
        Home
      </Link>
    ),
  },
  {
    key: 2,
    label: (
      <Link to="" className="btn w-100 text-white fw-bold fs-5 p-0">
        User Account
      </Link>
    ),
  },
];

export function AdminLayout() {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  return (
    <Layout style={{ height: "100dvh", position: "relative" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
        className="d-flex flex-row justify-content-between align-items-center"
      >
        <Logo />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          className="col-10 d-flex flex-row justify-content-center align-items-center"
        />
        <DropdownButton id="dropdown-basic-button" title="Admin Account" className="col-1 bg-transparent p-0 m-0">
          <Dropdown.Item href="#/action-3" className="px-2 m-0 text-red fw-bolder"><i className="bi bi-box-arrow-left fs-4 me-3"></i>ยืนยันออกจากระบบ</Dropdown.Item>
        </DropdownButton>
      </Header>
      <Content
        style={{
          padding: "20px 48px",
        }}
      >
        <div
        // style={{
        //   background: colorBgContainer,
        //   minHeight: 830,
        //   padding: 24,
        //   borderRadius: borderRadiusLG,
        // }}
        >
          Content
        </div>
      </Content>
    </Layout>
  );
}
