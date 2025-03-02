import React, { useEffect, useState } from "react";
import { message, Space, Typography } from "antd";
import MeetingCard from "../../components/MeetingCard";
import LeadService from "../../services/request/leads";
const { Text, Title } = Typography;

const CompletedMeetings = () => {
  const [meetings, setMeeting] = useState([]);

  useEffect(() => {
    LeadService.getClosedMeeting((res) => {
      if (res.status) {
        setMeeting(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, []);
  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div className="pb-3">
          <Title level={4} style={{ margin: 0 }}>
            Completed Meetings
          </Title>
          <Text type="secondary">View all completed meeting here</Text>
        </div>
      </div>

      <div
        style={{ overflowX: "auto" }}
        className="lg:max-w-[calc(100vw-290px)] max-w-[calc(100vw-40px)]"
      >
        <Space className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {meetings.map((meeting, index) => (
            <MeetingCard key={index} {...meeting} />
          ))}
        </Space>
        {!meetings.length && (
          <Text type="secondary" className="text-center">
            No Meetings Completed till now
          </Text>
        )}
      </div>
    </>
  );
};

export default CompletedMeetings;
