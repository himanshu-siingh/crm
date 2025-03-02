import React, { useEffect, useState } from "react";
import { Space, Spin, Tabs } from "antd";
import fallback from "../../assets/fallback.png";
import LeadFollowup from "../../components/lead/LeadFollowup";
import LeadMeetingCard from "../../components/lead/LeadMeetingCard";
import LeadTimeLine from "../../components/lead/LeadTImeLine";
import LeadService from "../../services/request/leads";
import { useLocation } from "react-router";
import { LeadStatuses } from "../../constants/Constants";
import SkeletonLoader from "../../components/lead/SkeletonLoader";
const { TabPane } = Tabs;

const Lead = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const { id } = location.state || {};
    setLoading(true);
    LeadService.getLeadProfile({ leadId: id }, (res) => {
      if (res.status) {
        setData(res.data);
      } else {
        message.error(res.message);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div>
          {/* Banner Section */}
          <div className="relative">
            <div className="h-32 bg-purple-500 rounded-t-lg"></div>
            <img
              src={data.logo ?? fallback}
              alt="Profile"
              className="absolute top-16 left-1/2 transform -translate-x-1/2 rounded-full w-24 h-24 border-4 bg-red-200 border-white"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center mt-16">
            <h1 className="text-2xl font-bold text-gray-800">
              {data?.company_name}
            </h1>
            <p className="text-gray-500">{data?.contact_name}</p>
            <p className="text-gray-400">
              {" "}
              {data?.mobile} | {data?.email}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-around mt-6">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">
                {data?.followup?.length}
              </p>
              <p className="text-sm text-gray-500">Followups</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">
                {data?.meetings?.length}
              </p>
              <p className="text-sm text-gray-500">Meeting</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">
                {LeadStatuses.filter((d) => d.value == data?.status)[0]?.label}
              </p>
              <p className="text-sm text-gray-500">Status</p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-6">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Followup" key="1">
                <LeadFollowup rows={data?.followup} />
              </TabPane>
              <TabPane tab="Meetings" key="2">
                <Space className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {data?.meetings?.map((meeting) => {
                    return <LeadMeetingCard {...meeting} />;
                  })}
                </Space>
              </TabPane>
              <TabPane tab="Timeline" key="3">
                <LeadTimeLine rows={data.followup ?? []} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Lead;
