import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Typography,
  Drawer,
  Form,
  Modal,
  message,
  DatePicker,
  TimePicker,
} from "antd";
import MeetingCard from "../../components/MeetingCard";
import AddMeeting from "../../components/AddMeeting";
import LeadService from "../../services/request/leads";
import ReactQuill from "react-quill";
import quillConfig from "../../extras/quillConfig";
import { useAuth } from "../../context/AuthContext";
const { Text, Title } = Typography;

const CloseMeeting = ({ handleClose, meeting, setLoad }) => {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    var mode = "";
    if (meeting.mode != "in_person" && meeting.mode != "video_call") {
      mode = "online_meeting";
    } else {
      mode = meeting.mode;
    }
    let param = {
      contact_name: meeting.attendee,
      lead_id: meeting.lead_id,
      meeting_id: meeting.meeting_id,
      mode: mode,
      notes: values.comments,
    };
    LeadService.closeMeeting(param, (res) => {
      if (res.status) {
        message.success("Meeting Closed Successfully");
        setLoad((v) => !v);
        handleClose();
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Meeting Comments" name="comments">
        <ReactQuill
          theme="snow"
          modules={quillConfig.modules}
          formats={quillConfig.formats}
          placeholder="Write something amazing..."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const RescheduleMeeting = ({ handleClose, meeting, setLoad }) => {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    //console.log({ ...values, ...meeting });
    LeadService.addMeeting({ ...values, ...meeting }, (res) => {
      if (res.status) {
        message.success("Meeting Rescheduled Successfully");
        setLoad((v) => !v);
        handleClose();
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const Meeting = () => {
  const [open, setOpen] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
  const [form] = Form.useForm();
  const [meetings, setMeeting] = useState([]);
  const [currentMeeting, setCurrentMeeting] = useState();
  const { hasPermission } = useAuth();
  const handleOpen = (meeting) => {
    setOpenCloseModal(true);
    setCurrentMeeting(meeting);
  };
  const handleOpenRescheduleModal = (meeting) => {
    setOpenRescheduleModal(true);
    setCurrentMeeting(meeting);
  };
  const addedMeeting = () => {
    form.resetFields();
    setOpen(false);
    setLoad((v) => !v);
  };
  useEffect(() => {
    LeadService.getMeeting((res) => {
      if (res.status) {
        setMeeting(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, [load]);
  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div className="pb-3">
          <Title level={4} style={{ margin: 0 }}>
            My Meetings
          </Title>
          <Text type="secondary">View all meeting here</Text>
        </div>
        <Space className="flex flex-wrap">
          {hasPermission("add:lead:meeting") && (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              + Create Meeting
            </Button>
          )}
        </Space>
      </div>

      <div
        style={{ overflowX: "auto" }}
        className="lg:max-w-[calc(100vw-290px)] max-w-[calc(100vw-40px)]"
      >
        <Space className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {meetings.map((meeting, index) => (
            <MeetingCard
              key={index}
              {...meeting}
              handleOpen={handleOpen}
              handleOpenRescheduleModal={handleOpenRescheduleModal}
            />
          ))}
        </Space>
        {!meetings.length && (
          <Text type="secondary" className="text-center">
            No Meetings Scheduled
          </Text>
        )}
      </div>
      <Drawer
        open={open}
        title="Schedule Meeting"
        onClose={() => setOpen(false)}
      >
        <AddMeeting form={form} finish={addedMeeting} />
      </Drawer>
      <Modal
        open={openCloseModal}
        onCancel={() => setOpenCloseModal(false)}
        footer={[]}
      >
        <CloseMeeting
          meeting={currentMeeting}
          setLoad={setLoad}
          handleClose={() => setOpenCloseModal(false)}
        />
      </Modal>
      <Modal
        open={openRescheduleModal}
        onCancel={() => setOpenRescheduleModal(false)}
        footer={[]}
      >
        <RescheduleMeeting
          meeting={currentMeeting}
          setLoad={setLoad}
          handleClose={() => setOpenRescheduleModal(false)}
        />
      </Modal>
    </>
  );
};

export default Meeting;
