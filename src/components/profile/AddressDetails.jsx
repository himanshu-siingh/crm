import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import DisplayRow from "./DisplayRow";
import EmployeeService from "../../services/request/employee";

const AddressDetails = ({ initialBankDetails, onSave }) => {
  const [address, setAddress] = useState(initialBankDetails);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      EmployeeService.updateAddress(
        { ...values, id: initialBankDetails.id },
        (res) => {
          if (res.status) {
            message.success("Address updated");
            setAddress(values);
            setEditing(false);
          } else {
            message.error(res.message);
          }
        }
      );
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <>
      {editing ? (
        <Form form={form} layout="vertical" initialValues={address}>
          <Form.Item
            name="address1"
            label="Address Line 1"
            rules={[
              {
                required: true,
                message: "Please enter the address!",
              },
            ]}
          >
            <Input placeholder="Enter Address Line 1" />
          </Form.Item>
          <Form.Item name="address2" label="Address Line 2">
            <Input placeholder="Enter Address Line 1" />
          </Form.Item>
          <Form.Item
            name="post_office"
            label="Post Office"
            rules={[
              { required: true, message: "Please enter the post office!" },
            ]}
          >
            <Input placeholder="Enter Post Office" />
          </Form.Item>
          <Form.Item name="landmark" label="Landmark">
            <Input placeholder="Enter Landmark" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please enter the city name!" }]}
          >
            <Input placeholder="Enter City Name" />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[
              { required: true, message: "Please enter the state name!" },
            ]}
          >
            <Input placeholder="Enter State Name" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[
              { required: true, message: "Please enter the country name!" },
            ]}
          >
            <Input placeholder="Enter Country Name" />
          </Form.Item>
          <Form.Item
            name="zip"
            label="Zip Code"
            rules={[{ required: true, message: "Please enter the zip code!" }]}
          >
            <Input placeholder="Enter Zip Code" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <DisplayRow title="Address Line 1" value={address.address1} />
          <DisplayRow title="Address Line 2" value={address.address2} />
          <DisplayRow title="Post Office" value={address.post_office} />
          <DisplayRow title="Landmark" value={address.landmark} />
          <DisplayRow title="City" value={address.city} />
          <DisplayRow title="State" value={address.state} />
          <DisplayRow title="Country" value={address.country} />
          <DisplayRow title="Zipcode" value={address.zip} />
          <Button type="primary" className="mt-2" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}
    </>
  );
};

export default AddressDetails;
