import { Divider, Typography } from "antd";
import React from "react";
const { Text } = Typography;
const Footer = () => {
  return (
    <div className="sticky bottom-0">
      <Divider className="m-0" />
      <div className="text-center">
        <Text type="secondary">Company &copy; {new Date().getFullYear()}</Text>
      </div>
    </div>
  );
};

export default Footer;
