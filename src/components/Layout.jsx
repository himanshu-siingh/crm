import React, { useRef, useState } from "react";

import { Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { Button, Drawer, Tour } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./layout.css";
const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpenSidebar(false);
  };

  const steps = [
    {
      title: "Side Navigation",
      description: "Used to navigate throughout application",
      target: () => ref1.current,
    },
    {
      title: "Top Navigation",
      description: "Have Search bar and profile",
      target: () => ref2.current,
    },
    {
      title: "Content Area",
      description: "This is where actual content will show",
      target: () => ref3.current,
    },
  ];
  return (
    <>
      <div className="flex flex-row">
        <div
          className="h-[100vh] lg:block hidden overflow-auto border-r-2 min-w-[240px]"
          ref={ref1}
        >
          <Sidebar />
        </div>

        <div className="flex-auto">
          <div ref={ref2}>
            <Topbar setOpenSidebar={setOpenSidebar} />
          </div>

          <div
            ref={ref3}
            className="p-5 overflow-auto max-h-[87vh] content-area"
          >
            <Outlet />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      <div className="lg:hidden ">
        <Drawer
          title={<img src={logo} width={150} alt="Seenarise" />}
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
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </div>
    </>
  );
};
export default Layout;
