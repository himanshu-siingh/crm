import React from "react";
import { Avatar, Button, Divider, Dropdown, Space, Typography } from "antd";
import {
  SettingOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const items = [
  {
    key: "account",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "setting",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];
const Topbar = ({ setOpenSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = (e) => {
    switch (e.key) {
      case "logout":
        logout();
        break;
      case "profile":
        navigate("/employee/profile", {
          state: {
            id: user.empId,
          },
        });
        break;
      case "setting":
        break;
      case "account":
        break;

      default:
        break;
    }
  };
  return (
    <>
      <div className="flex justify-between px-5 py-3">
        <div className="flex flex-col justify-center">
          <Button
            className="lg:hidden"
            type="outlined"
            icon={<MenuFoldOutlined />}
            onClick={() => {
              setOpenSidebar((open) => !open);
            }}
          />
        </div>
        <div className="hidden sm:flex flex-col justify-center">
          <Search
            placeholder="Search for user, employee, projects...."
            style={{
              width: 300,
            }}
          />
        </div>
        <Space>
          <Text type="secondary">Welcome, {user?.name}</Text>
          <Dropdown
            menu={{
              items,
              onClick: handleClick,
            }}
          >
            <Avatar size={40} src={user?.profile} />
          </Dropdown>
        </Space>
      </div>
      <Divider className="m-0 p-0" />
    </>
  );
};

export default Topbar;
