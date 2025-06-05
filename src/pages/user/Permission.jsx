import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
const { Text, Title } = Typography;
import React, { useEffect, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import UserService from "../../services/request/user";

const PermissionCreation = ({
  isModalOpen,
  handleOk,
  handleCancel,
  setLoad,
}) => {
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false)
  const addPermission = (values) => {
    setLoading(true);
    UserService.createPermission(values, (res) => {
      if (res.status) {
        message.success("Permission added Succesfully");
        setLoad((x) => !x);
        form.resetFields();
        setLoading(false)
        handleOk();
      } else {
        message.error(res.message);
      }
    });
  };

  const handleClose = () => {
    form.resetFields();
    handleOk();
  };

  return (
    <Modal
      title="Create Permission"
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      footer={[]}
    >
      <p>Add new Permission here </p>
      <div className="py-5">
        <Form layout="vertical" form={form} onFinish={addPermission}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Permission name is required" }]}
          >
            <Input placeholder="Ex- Add Employee" className="py-1" />
          </Form.Item>
          <Form.Item
            label="Permission"
            name="permission"
            rules={[{ required: true, message: "Permission is required" }]}
          >
            <Input placeholder="Ex- add:employee" className="py-1" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Create Permission
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

const Permission = () => {
  const [rows, setRows] = useState([]);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPermissionModal = (id) => {
    setPermissionModalOpen(true);
  };
  const handlePermissionOk = () => {
    setPermissionModalOpen(false);
  };
  const handlePermissionCancel = () => {
    setPermissionModalOpen(false);
  };
  useEffect(() => {
    setLoading(true);
    UserService.getAllPermission((res) => {
      setLoading(false);
      if (res.status) {
        setRows(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, [load]);
  const columns = [
    {
      title: "S.no",
      dataIndex: "id",
      rowScope: "row",
      render: (d, r, i) => i + 1,
    },
    {
      title: "Permission Name",
      dataIndex: "permission_name",
      key: "permission_name",
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
            <Popconfirm
              title="Delete the permission"
              description="Are you sure to delete this permission?"
              onConfirm={() => {
                UserService.deletePermission({ id }, (res) => {
                  if (res.status) {
                    message.success("Permission deleted Succesfully");
                    setLoad(!load);
                  } else {
                    message.error("Failed to delete permission");
                  }
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Text className="text-blue-400 hover:text-blue-700 cursor-pointer">
                Delete
              </Text>
            </Popconfirm>
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
      <div style={{ overflowX: "auto" }} className="max-w-[calc(100vw-40px)]">
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows.map((row) => ({ ...row, key: row.id }))}
          pagination={{
            // pageSize: 5,
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20],
            showTotal: (total) => `Total ${total} roles`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
      <PermissionCreation
        isModalOpen={permissionModalOpen}
        handleOk={handlePermissionOk}
        handleCancel={handlePermissionCancel}
        setLoad={setLoad}
      />
    </>
  );
};

export default Permission;
