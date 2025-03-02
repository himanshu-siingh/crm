import React from "react";
import { Card, Typography } from "antd";
const { Text, Title } = Typography;
import { MeetingStatus } from "../../constants/Constants";
import moment from "moment";
const LeadMeetingCard = ({
  meeting_name,
  meeting_attended_by,
  meeting_person,
  date,
  time,
  status,
}) => {
  return (
    <Card
      className="shadow-lg min-w-[250px] border border-gray-200 rounded-md pb-4 mb-6"
      hoverable
    >
      <div className="text-center mb-3">
        <Title level={4} className="text-sm text-gray-500">
          {meeting_name}
        </Title>
      </div>

      <div className="text-left">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Attendees:</span>{" "}
          {meeting_attended_by}, {meeting_person}
        </p>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {moment(date).format("Do MMMM YYYY")}
        </p>
        <p>
          <span className="font-semibold">Time:</span>{" "}
          {moment(time).format("h:mm:ss a")}
        </p>
      </div>
      <Text className="text-center bg-green-300 rounded-sm py-2 block w-full">
        Meeting {MeetingStatus[status]}
      </Text>
    </Card>
  );
};

export default LeadMeetingCard;
