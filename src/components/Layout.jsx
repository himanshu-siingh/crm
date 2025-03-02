import React, { useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import { Button, Drawer } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./layout.css";
import Breadcrumb from "./Breadcrumb";
const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const onClose = () => {
    setOpenSidebar(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="lg:block hidden border-r-2 min-w-[250px]">
          <Sidebar />
        </div>

        <div className="flex-auto">
          <div>
            <Topbar setOpenSidebar={setOpenSidebar} />
            <Breadcrumb />
          </div>

          <div className="px-5 py-2 overflow-auto max-h-[calc(100vh-110px)] content-area">
            <Outlet />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      <div className="lg:hidden ">
        <Drawer
          title={<img src={logo} width={150} alt="Seemarise" />}
          width={284}
          placement={"left"}
          closable={false}
          size="default"
          onClose={onClose}
          open={openSidebar}
          key={"left"}
          keyboard={true}
          className="lg:hidden"
          style={
            {
              // maxWidth: "240px",
            }
          }
          extra={
            <Button type="dnkj" onClick={onClose}>
              <CloseCircleOutlined />
            </Button>
          }
        >
          <Sidebar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            drawer={true}
          />
        </Drawer>
      </div>
    </>
  );
};
export default Layout;
