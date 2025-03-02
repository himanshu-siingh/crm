import React from "react";
import { Skeleton } from "antd";

const SkeletonLoader = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col items-center bg-purple-500 p-6 rounded-lg relative">
        <Skeleton.Avatar
          active
          size={80}
          className="absolute top-8 md:top-10"
        />
        <Skeleton.Input
          active
          className="mt-20 w-40 md:w-48 h-6"
          style={{ borderRadius: "4px" }}
        />
        <Skeleton.Input
          active
          className="mt-4 w-28 md:w-36 h-4"
          style={{ borderRadius: "4px" }}
        />
        <Skeleton.Input
          active
          className="mt-2 w-40 md:w-48 h-4"
          style={{ borderRadius: "4px" }}
        />
        <div className="flex mt-4 gap-2 md:gap-4">
          <Skeleton.Input
            active
            className="w-20 md:w-24 h-6"
            style={{ borderRadius: "4px" }}
          />
          <Skeleton.Input
            active
            className="w-20 md:w-24 h-6"
            style={{ borderRadius: "4px" }}
          />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8">
        <div className="flex justify-center gap-4 md:gap-6">
          <Skeleton.Button
            active
            shape="default"
            className="w-20 md:w-24 h-8"
          />
          <Skeleton.Button
            active
            shape="default"
            className="w-20 md:w-24 h-8"
          />
          <Skeleton.Button
            active
            shape="default"
            className="w-20 md:w-24 h-8"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <Skeleton.Input
          active
          className="w-full h-6"
          style={{ borderRadius: "4px" }}
        />
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4">
              <Skeleton.Input
                active
                className="w-full md:w-1/4 h-4"
                style={{ borderRadius: "4px" }}
              />
              <Skeleton.Input
                active
                className="w-full md:w-1/4 h-4"
                style={{ borderRadius: "4px" }}
              />
              <Skeleton.Input
                active
                className="w-full md:w-1/4 h-4"
                style={{ borderRadius: "4px" }}
              />
              <Skeleton.Input
                active
                className="w-full md:w-1/4 h-4"
                style={{ borderRadius: "4px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
