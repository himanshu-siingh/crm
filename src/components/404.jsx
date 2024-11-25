import React from "react";
import { Empty, Typography } from "antd";
const NotFound = () => (
  <>
    <div className=" flex flex-col justify-center items-center h-[60vh]">
      <Empty description={false} />
      <Typography className="text-center">Page Not Found</Typography>
    </div>
  </>
);
export default NotFound;
