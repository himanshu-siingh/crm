import React from "react";
import { Timeline } from "antd";
import DOMPurify from "dompurify";
import moment from "moment";

const LeadTimeLine = ({ rows }) => {
  var data = rows.length
    ? rows
        .map((row) => {
          var datetime = moment(row.followup_date).format(
            "MMMM Do YYYY, h:mm a"
          );
          return { datetime: datetime, description: row.comments };
        })
        .reverse()
    : [];
  return (
    <Timeline
      mode="left"
      items={data.map((row) => ({
        label: row.datetime,
        children: (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.description),
            }}
          />
        ),
      }))}
    />
  );
};

export default LeadTimeLine;
