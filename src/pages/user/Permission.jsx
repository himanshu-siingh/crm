import { Button, Input, Modal, Space, Table, Tag, Typography } from "antd";
const { Text, Title } = Typography;
import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";

const dummyData = [
  { id: 1, pageID: 1901, permission: "Ticket Management" },
  { id: 2, pageID: 1902, permission: "Customer Interaction" },
  { id: 3, pageID: 1903, permission: "Problem Resolution" },
  { id: 4, pageID: 1904, permission: "Feedback Collection" },
  { id: 5, pageID: 1905, permission: "Knowledge Base Management" },
  { id: 6, pageID: 1906, permission: "Escalation Management" },
  { id: 7, pageID: 1907, permission: "Service Level Management" },
  { id: 8, pageID: 1908, permission: "Report Generation" },
  { id: 9, pageID: 1909, permission: "User Training" },
  { id: 10, pageID: 1910, permission: "Collaboration with Teams" },
];

const PermissionCreation = ({ isModalOpen, handleOk, handleCancel }) => {
  const [data, setData] = useState();
  return (
    <Modal
      title="Create Permission"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <p>Add new Permission here </p>
      <div className="py-5">
        <Title level={5}>
          Page ID <span className="text-red-600">*</span>
        </Title>
        <Input
          value={data?.pageID}
          onChange={({ target }) => setUser({ ...data, pageID: target.value })}
          placeholder="Ex- 1132"
          className="py-1"
        />
        <Title level={5} className="mt-5">
          Permission <span className="text-red-600">*</span>
        </Title>
        <Input
          value={data?.permission}
          onChange={({ target }) =>
            setUser({ ...data, permission: target.value })
          }
          placeholder="Ex - User List"
          className="py-1"
        />
      </div>
    </Modal>
  );
};

const Permission = () => {
  const [rows, setRows] = useState(dummyData);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);

  const showPermissionModal = (id) => {
    setPermissionModalOpen(true);
  };
  const handlePermissionOk = () => {
    setPermissionModalOpen(false);
  };
  const handlePermissionCancel = () => {
    setPermissionModalOpen(false);
  };

  const columns = [
    {
      title: "S.no",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Page Id",
      dataIndex: "pageID",
      key: "pageID",
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
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
              onClick={() => console.log(`Deleted ${id}`)}
              className="text-blue-400 hover:text-blue-700"
            >
              Delete
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
            Permission
          </Title>
          <Text type="secondary">View all Permission here</Text>
        </div>
        <div>
          <Button
            color="primary"
            variant="outlined"
            onClick={showPermissionModal}
          >
            <UserAddOutlined /> Create Permission
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto", maxWidth: "88vw" }}>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows}
          pagination={{
            // pageSize: 5,
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20],
            showTotal: (total) => `Total ${total} roles`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
      </div>
      <PermissionCreation
        isModalOpen={permissionModalOpen}
        handleOk={handlePermissionOk}
        handleCancel={handlePermissionCancel}
      />
    </>
  );
};

export default Permission;
