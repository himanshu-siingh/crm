import React from "react";
import { Avatar, Button, Divider, Dropdown, Space, Typography } from "antd";
import {
  SettingOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
const { Text } = Typography;
const items = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: <a href="../user/profile">Profile</a>,
    icon: <UserOutlined />,
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
  {
    key: "3",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];
const Topbar = ({ setOpenSidebar }) => {
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
          <Text type="secondary">Welcome, Himanshu</Text>
          <Dropdown
            menu={{
              items,
            }}
          >
            <Avatar size={40} icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </div>
      <Divider className="m-0 p-0" />
    </>
  );
};

export default Topbar;
