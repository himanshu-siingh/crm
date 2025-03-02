import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import UserService from "../../services/request/user";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    UserService.getLogin(values, (res) => {
      if (res.status) {
        login(res);
      } else {
        notification.error({
          message: "Invalid Credentials",
          description:
            "The username or password you entered is incorrect. Please try again.",
          placement: "topRight",
          duration: 5,
        });
      }
      setLoading(false);
    });
  };

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
          Sign In to Your Account
        </h2>

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
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
