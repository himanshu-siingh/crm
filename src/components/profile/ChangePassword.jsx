import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import UserService from "../../services/request/user";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    setLoading(true);
    UserService.updatePassword(values, (res) => {
      if (res.status) {
        form.resetFields();
        message.success("Password Updated succesfully");
      } else {
        message.error("Error updating password");
      }
      setLoading(false);
    });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      {/* New Password Field */}
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          { required: true, message: "Please enter your new password!" },
          {
            min: 8,
            max: 15,
            message: "Password length must be between 8 - 15 characters long!",
          },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#]).*$/,
            message:
              "Password must contain at least one uppercase letter and one number and one special character(@,#)",
          },
        ]}
      >
        <Input.Password placeholder="Enter your new password" />
      </Form.Item>

      {/* Confirm Password Field */}
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Please confirm your new password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm your new password" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Update Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
