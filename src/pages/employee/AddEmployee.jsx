import React, { useEffect, useState } from "react";
import { print_city, print_state } from "../../../cities.js";
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
import { Country, State, City } from "country-state-city";
import { BankNames } from "../../constants/Constants.js";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [departs, setDeparts] = React.useState([]);
  const [state, setState] = useState();
  const [stateCode, setStateCode] = useState();
  const [index, setIndex] = useState();
  const [cities, setCities] = useState();

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
    setCities(City.getCitiesOfState("IN", stateCode));
  }, [stateCode]);

  // useEffect(()=>{
  //   EmployeeService.getBankDetails((res)=>{
  //     if(res.status){
  //       console.log(res);
  //     }else{
  //       console.log("not working");
  //     }
  //   })
  // })

  useEffect(() => {
    EmployeeService.getDesigDepart((res) => {
      if (res.status) {
        setDeparts(res.data);
        setState(State.getStatesOfCountry("IN"));
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

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please select a State" }]}
          >
            <Select
              onChange={(e) => setStateCode(e)}
              placeholder="Select State"
            >
              {state?.map((s) => {
                return <option value={s.isoCode}>{s.name}</option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please select a City" }]}
          >
            <Select placeholder="Select City">
              {cities?.map((c) => {
                return <option value={c.name}>{c.name}</option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Bank"
            name="bank"
            rules={[{ required: true, message: "Please select a Bank" }]}
          >
            <Select placeholder="Select Bank" options={BankNames} />
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
