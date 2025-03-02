import { Table } from "antd";
import React from "react";
import { FollowUpModes } from "../../constants/Constants";
import DOMPurify from "dompurify";
import moment from "moment";
const columns = [
  {
    title: "Person Name",
    dataIndex: "followup_person",
    key: "person_name",
  },
  {
    title: "Attended By",
    dataIndex: "attended_by",
    key: "user",
  },
  {
    title: "Follow-up Notes",
    dataIndex: "comments",
    key: "comments",
    render: (text) => {
      return (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      );
    },
  },
  {
    title: "Mode",
    dataIndex: "mode",
    key: "mode",
    render: (text) => {
      return FollowUpModes.filter((m) => m.value == text)[0].label;
    },
  },
  {
    title: "Date & Time",
    dataIndex: "followup_date",
    key: "datetime",
    render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
  },
];
const LeadFollowup = ({ rows }) => {
  return (
    <div
      style={{ overflowX: "auto" }}
      className="lg:max-w-[calc(100vw-290px)] max-w-[calc(100vw-60px)]"
    >
      <Table columns={columns} dataSource={rows} pagination={false} />
    </div>
  );
};

export default LeadFollowup;
