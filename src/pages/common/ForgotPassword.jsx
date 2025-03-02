import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Steps, message } from "antd";
import UserService from "../../services/request/user";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const { login } = useAuth();
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    //console.log("onChange:", value);
    setCurrent(value);
  };
  const onFinish = (values) => {
    UserService.getLogin(values, (res) => {
      login(res);
    });
    //console.log("Success:", values);
  };
  const steps = [
    {
      content: "Hello",
    },
    {
      content: "world",
    },
    {
      content: "bro",
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-600 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Forgot Password
        </h2>

        <div>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => setCurrent((x) => x + 1)}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => setCurrent((x) => x - 1)}
            >
              Previous
            </Button>
          )}
        </div>
        <Form
          name="sign-in"
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter your Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
