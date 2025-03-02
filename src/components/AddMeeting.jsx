import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  message,
} from "antd";
import LeadService from "../services/request/leads";
import { meetingModes } from "../constants/Constants";

const AddMeeting = ({ form, disabled, finish }) => {
  const [leadsoption, setLeads] = useState([]);
  useEffect(() => {
    LeadService.getLeads((res) => {
      if (res.status) {
        var data = res.data.map((item) => {
          return { value: item.id, label: item.company_name };
        });
        setLeads(data);
      } else {
        message.error(res.message);
      }
    });
  }, []);
  const onFinish = (values) => {
    LeadService.addMeeting(values, (res) => {
      if (res.status) {
        finish();
        message.success("Meeting Scheduled succesffuly");
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          mode: "in_person",
        }}
      >
        {/* Select Lead */}
        <Form.Item
          label="Select Lead"
          name="lead"
          rules={[{ required: true, message: "Please select a lead!" }]}
        >
          <Select
            disabled={disabled}
            placeholder="Select a lead"
            options={leadsoption}
          />
        </Form.Item>

        {/* Meeting Name */}
        <Form.Item
          label="Meetig Name"
          name="meeting_name"
          rules={[{ required: true, message: "Please enter meeting name!" }]}
        >
          <Input placeholder="Enter meeting name" />
        </Form.Item>

        {/* Attendee Name */}
        <Form.Item
          label="Attendee Name"
          name="attendee"
          rules={[{ required: true, message: "Please enter attendee name!" }]}
        >
          <Input placeholder="Enter attendee name" />
        </Form.Item>

        {/* Meeting Date */}
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please choose a date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Meeting Time */}
        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: "Please choose a time!" }]}
        >
          <TimePicker className="w-full" />
        </Form.Item>

        {/* Meeting Mode */}
        <Form.Item
          label="Mode"
          name="mode"
          rules={[{ required: true, message: "Please select a mode!" }]}
        >
          <Select placeholder="Select meeting mode" options={meetingModes} />
        </Form.Item>

        {/* Meeting Link */}
        <Form.Item
          label="Meeting Link"
          name="link"
          rules={[
            {
              required: true,
              message: "Please enter the meeting link!",
              type: "url",
              warningOnly: true,
            },
          ]}
        >
          <Input placeholder="Enter meeting link (if applicable)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Schedule Meeting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMeeting;
