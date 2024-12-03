import { Button, Table, Typography } from "antd";

import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/request/employee";
const { Title, Text } = Typography;

const Employee = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    EmployeeService.getEmployees((res) => {
      if (res.status) {
        setRows(res.data);
      }
    });
  }, []);
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Date of Joining",
      dataIndex: "doj",
      key: "doj",
    },
    {
      title: "Father's Name",
      dataIndex: "father_name",
      key: "father_name",
    },
    {
      title: "Mother's Name",
      dataIndex: "mother_name",
      key: "mother_name",
    },
    {
      title: "Aadhar Number",
      dataIndex: "aadhar",
      key: "aadhar",
    },
    {
      title: "PAN Number",
      dataIndex: "pan",
      key: "pan",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === 1 ? "Active" : "Inactive"), // Optional: Formatting status
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Employees
          </Title>
          <Text type="secondary">View all available Designation</Text>
        </div>
        <div>
          <Button color="primary" variant="outlined">
            + Add Employees
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto", maxWidth: "80vw" }}>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} users`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          //   loading={loading}
        />
      </div>
    </div>
  );
};

export default Employee;
