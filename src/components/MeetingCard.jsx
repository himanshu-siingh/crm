import React from "react";
import { Card, Button, Avatar, Typography, Space } from "antd";
const { Text } = Typography;
import fallback from "../assets/fallback.png";
import { meetingModes, MeetingStatus } from "../constants/Constants";
import moment from "moment";
const MeetingCard = ({
  id,
  lead_id,
  companyName,
  meeting_name,
  attendee,
  joinLink,
  date,
  time,
  mode,
  status,
  companyLogo,
  handleOpen,
  handleOpenRescheduleModal,
}) => {
  var avatarSrc = companyLogo ? companyLogo : fallback;
  return (
    <Card
      className="shadow-lg min-w-[250px] sm:w-[300] w-full border border-gray-200 rounded-md pb-4 mb-6"
      hoverable
    >
      <div className="text-center pb-3">
        <Avatar src={avatarSrc} size={64} />
      </div>

      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{companyName}</h3>
          <p className="text-sm text-gray-500">{meeting_name}</p>
        </div>
      </div>

      <div className="text-left">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Attendees:</span> {attendee}
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
      {status != 1 ? (
        <Text className="text-center bg-green-300 rounded-sm py-2 block w-full">
          Meeting {MeetingStatus[status]}
        </Text>
      ) : (
        <>
          {mode != "offline" ? (
            <>
              <Button
                type="primary"
                href={joinLink}
                target="_blank"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                Join Meeting on{" "}
                {meetingModes.filter((modes) => modes.value == mode)[0]?.label}
              </Button>
            </>
          ) : (
            <Text className="text-center bg-green-300 rounded-sm py-2 block w-full">
              Offline Meeting
            </Text>
          )}
          <div className="flex py-2">
            <Button
              className="w-[50%] mr-1"
              onClick={() => {
                handleOpen({
                  meeting_id: id,
                  attendee,
                  mode,
                  lead_id,
                });
              }}
            >
              Close Meeting
            </Button>
            <Button
              className="w-[50%] ml-1"
              onClick={() => {
                handleOpenRescheduleModal({
                  reschedule_id: id,
                  attendee,
                  mode,
                  lead: lead_id,
                  meeting_name,
                  link: joinLink,
                });
              }}
            >
              Reschedule
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default MeetingCard;
