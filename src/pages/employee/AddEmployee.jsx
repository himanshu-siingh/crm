import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Typography,
  message,
} from "antd";
import EmployeeService from "../../services/request/employee";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { Option } = Select;

const AddEmployee = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [departs, setDeparts] = React.useState([]);
  const [index, setIndex] = useState();

  const handleSubmit = (values) => {
    //console.log("Form Values:", values);
    EmployeeService.addEmployee(values, (res) => {
      if (res.status) {
        message.success("Employee Added Succesfully");
        navigate("/employee");
      } else {
        message.error(res.message);
      }
    });
  };

  useEffect(() => {
    EmployeeService.getDesigDepart((res) => {
      if (res.status) {
        setDeparts(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, []);

  const handleChange = (value) => {
    const selectedIndex = departs.findIndex(
      (department) => department.id === value
    );
    setIndex(selectedIndex);
    //console.log(selectedIndex); // or handle the index as needed
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Add Employee
          </Title>
          <Text type="secondary">Add new joinees here</Text>
        </div>
      </div>
      <div className=" md:p-8 mt-5 w-full">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Form.Item
            label="Employee Name"
            name="employeeName"
            rules={[{ required: true, message: "Please enter Employee Name" }]}
          >
            <Input placeholder="Enter Employee Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid Email",
              },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: "Please enter Mobile Number" }]}
          >
            <Input placeholder="Enter Mobile Number" />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please select a Department" }]}
          >
            <Select placeholder="Select Department" onChange={handleChange}>
              {departs.map((d, i) => {
                return (
                  <Option value={d.id} data-index={i}>
                    {d.department_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true, message: "Please select a Designation" }]}
          >
            <Select placeholder="Select Status">
              {departs[index] &&
                departs[index].designation.map((dp) => {
                  return <Option value={dp.id}>{dp.name}</Option>;
                })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please select Date of Birth" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Date of Joining"
            name="dateOfJoining"
            rules={[
              { required: true, message: "Please select Date of Joining" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Father's Name"
            name="fatherName"
            rules={[{ required: true, message: "Please enter Father's Name" }]}
          >
            <Input placeholder="Enter Father's Name" />
          </Form.Item>

          <Form.Item
            label="Mother's Name"
            name="motherName"
            rules={[{ required: true, message: "Please enter Mother's Name" }]}
          >
            <Input placeholder="Enter Mother's Name" />
          </Form.Item>

          <Form.Item
            label="Aadhar Number"
            name="aadharNumber"
            rules={[{ required: true, message: "Please enter Aadhar Number" }]}
          >
            <Input placeholder="Enter Aadhar Number" />
          </Form.Item>

          <Form.Item
            label="PAN Number"
            name="panNumber"
            rules={[{ required: true, message: "Please enter PAN Number" }]}
          >
            <Input placeholder="Enter PAN Number" />
          </Form.Item>

          <div className="md:col-span-2 flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
