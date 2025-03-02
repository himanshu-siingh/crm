import React from "react";
import { Typography } from "antd";
const { Text } = Typography;
const DisplayRow = ({ title, value }) => {
  return (
    <div className="border-b-2 py-2">
      <Text strong className="inline">
        {title} :
      </Text>
      <p className="inline ml-2 text-gray-400">{value}</p>
    </div>
  );
};

export default DisplayRow;
