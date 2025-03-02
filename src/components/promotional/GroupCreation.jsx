import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import PromotionalService from "../../services/request/promotional";

const GroupCreation = ({ open, handleCancel, setLoad }) => {
  const [form] = Form.useForm();
  const options = [
    {
      label: "Employee",
      value: "employee",
    },
    {
      label: "Leads",
      value: "leads",
    },
    {
      label: "Clients",
      value: "clients",
    },
  ];
  const submitCreation = (values) => {
    PromotionalService.addGroup(values, (res) => {
      if (res.status) {
        handleCancel();
        setLoad((v) => !v);
        message.success("Group Created");
        form.resetFields();
      } else {
        message.error("Error creating group");
      }
    });
  };
  return (
    <Modal
      title="Group Creation"
      open={open}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form layout="vertical" form={form} onFinish={submitCreation}>
        <Form.Item
          label="Group Name"
          name="name"
          rules={[{ required: true, message: "Please Enter group name" }]}
        >
          <Input placeholder="Enter Group Name" />
        </Form.Item>
        <Form.Item
          label="Group Description"
          name="description"
          rules={[
            { required: true, message: "Please Enter group description" },
          ]}
        >
          <Input.TextArea placeholder="Enter Group Description" />
        </Form.Item>
        <Form.Item
          label="Select Category"
          name="category"
          rules={[{ required: true, message: "Select a group Category" }]}
        >
          <Select placeholder="Select Category" options={options} />
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full"
            color="primary"
            variant="outlined"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupCreation;
