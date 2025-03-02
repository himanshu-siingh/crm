import { Button, Input, message, Space, Table, Typography } from "antd";

import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/request/employee";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const { Title, Text } = Typography;

const Employee = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { hasPermission } = useAuth();
  useEffect(() => {
    setLoading(true);
    EmployeeService.getEmployees((res) => {
      setLoading(false);
      if (res.status) {
        setRows(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, []);
  const navigate = useNavigate();
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
      render: (text, row) => {
        return (
          <Button
            type="link"
            className="text-black"
            onClick={() =>
              navigate(`/employee/profile`, {
                state: {
                  id: row.id,
                },
              })
            }
          >
            {text}
          </Button>
        );
      },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === 1 ? "Active" : "Inactive"), // Optional: Formatting status
    },
  ];

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Employees
          </Title>
          <Text type="secondary">View all available Designation</Text>
        </div>
        <Space className="flex flex-wrap-reverse items-center">
          <div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Username or employee Name to search"
              className="sm:w-[280px]"
            />
          </div>

          {hasPermission("add:employees") && (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                navigate("./add");
              }}
            >
              + Add Employees
            </Button>
          )}
        </Space>
      </div>
      <div
        style={{ overflowX: "auto" }}
        className="lg:max-w-[calc(100vw-290px)] max-w-[calc(100vw-40px)]"
      >
        <Table
          className="mt-5 py-0"
          columns={columns}
          dataSource={rows.filter((row) =>
            row?.employee_name
              ?.toLowerCase()
              .includes(query.trim().toLowerCase())
          )}
          size="small"
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} users`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Employee;
