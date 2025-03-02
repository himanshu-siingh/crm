import { Button, Table, Typography } from "antd";

import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/request/employee";
import { useLocation, useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const EmployeeByDepart = () => {
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  useEffect(() => {
    //console.log(data);
    EmployeeService.getEmployeeByDepart(
      {
        departmentId: data.department_id,
        designatioId: data.id,
      },
      (res) => {
        if (res.status) {
          setRows(res.data);
        } else {
          message.error(res.message);
        }
      }
    );
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
            Employees By Department
          </Title>
          <Text type="secondary">Department : {data.department_name}</Text>
          <br />
          {data.designation && (
            <Text type="secondary">Designation : {data.designation}</Text>
          )}
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

export default EmployeeByDepart;
