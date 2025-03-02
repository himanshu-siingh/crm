import { Spin } from "antd";
import React from "react";

const PageLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
