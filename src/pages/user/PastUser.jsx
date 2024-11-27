import {
  Button,
  Checkbox,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
const { Text, Title } = Typography;
import React, { useEffect, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import UserService from "../../services/request/user";
import "./user.css";

const PastUser = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.getPastUser({}, (res) => {
      setLoading(false);
      if (res.status) {
        setRows(res.data);
      }
    });
  }, [load]);

  const columns = [
    {
      title: "S.no",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
      sorter: (a, b) => a.empName - b.empName,
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      render: (_, { roles }) => {
        return roles.map((role) => {
          return <Tag>{role.name?.toUpperCase()}</Tag>;
        });
      },
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (_, { id }) => {
        return (
          <Space>
            <Button
              type="fn"
              className="text-blue-400 hover:text-blue-700"
              onClick={() => {
                UserService.changeStatus({ status: 1, userId: id }, (res) => {
                  if (res.status) {
                    message.success("User Activated");
                    setLoad((x) => !x);
                  } else {
                    message.error("Failed to activate user");
                  }
                });
              }}
            >
              Activate
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Previous Users
          </Title>
          <Text type="secondary">
            View previous employees user account here
          </Text>
        </div>
      </div>
      <div style={{ overflowX: "auto", maxWidth: "88vw" }}>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows}
          pagination={{
            // pageSize: 5,
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} users`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
    </>
  );
};

export default PastUser;
