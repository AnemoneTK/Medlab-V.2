import { Layout, Menu } from "antd";
import { Logo } from "../../components/Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;
const items = [
  {
    key: 1,
    label: (
      <Link to="" className="btn w-100 text-white fw-bold fs-5 p-0 border border-0">
        Home
      </Link>
    ),
  },
  {
    key: 2,
    label: (
      <Link to="" className="btn w-100 text-white fw-bold fs-5 p-0 border border-0">
        User Account
      </Link>
    ),
  },
];

export function AdminLayout() {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

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
          sessionStorage.clear();
          window.location = "/";
        }
      });
  }, []);

  const [userName,setUserName]= useState("")

  useEffect(() => {
    const data = {
      username: sessionStorage.getItem("username")
    };
    fetch("http://localhost:3000/getUserDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "error") {
          setUserName(()=>data[0].name+" "+data[0].surname)
        }
      });
  }, []);
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
          className="me-auto d-flex flex-row justify-content-center align-items-center "
        />
        <div className="p-0 m-0 " style={{minWidth:"200px"}}>
          <div className="dropdown col-12 p-0 m-0 d-flex align-items-end">
            <button
              className="btn text-white dropdown-toggle col-12 fs-5 fw-bold border border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userName}
            </button>
            <ul className="dropdown-menu p-0">
              <li>
                <a className="dropdown-item text-red fw-bolder col" onClick={()=>{
                  sessionStorage.clear();
                  window.location = "/"
                }}>
                  <i className="bi bi-box-arrow-left fs-4 me-3"></i>ยืนยันออกจากระบบ
                </a>
              </li>
              
            </ul>
          </div>
          {/* <DropdownButton id="dropdown-basic-button" title={username} className="col">
          <Dropdown.Item href="#/action-3" className="px-2 m-0 text-red fw-bolder col" ><i className="bi bi-box-arrow-left fs-4 me-3"></i>ยืนยันออกจากระบบ</Dropdown.Item>
        </DropdownButton> */}
        </div>
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
