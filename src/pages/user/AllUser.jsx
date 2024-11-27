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
const dummyData = [
  {
    username: "user1",
    empName: "Alice Johnson",
    id: 1,
    roles: [
      {
        id: 1,
        role: "admin",
      },
      {
        id: 2,
        role: "manager",
      },
    ],
  },
  {
    username: "user2",
    empName: "Bob Smith",
    id: 2,
    roles: [
      {
        id: 3,
        role: "editor",
      },
    ],
  },
  {
    username: "user3",
    empName: "Charlie Brown",
    id: 3,
    roles: [
      {
        id: 4,
        role: "viewer",
      },
    ],
  },
  {
    username: "user4",
    empName: "Diana Prince",
    id: 4,
    roles: [
      {
        id: 5,
        role: "admin",
      },
      {
        id: 6,
        role: "editor",
      },
    ],
  },
  {
    username: "user5",
    empName: "Ethan Hunt",
    id: 5,
    roles: [
      {
        id: 7,
        role: "manager",
      },
      {
        id: 8,
        role: "viewer",
      },
    ],
  },
];

const UserCreation = React.memo(
  ({ isModalOpen, handleOk, handleCancel, messageApi, setLoad }) => {
    const [user, setUser] = useState();
    const createUser = () => {
      var param = {
        empID: 0,
        username: user.username,
        password: user.username,
      };
      UserService.createUser(param, (res) => {
        var type, content;
        if (res.status) {
          type = "success";
          content = "User created successfully";
          setUser();
          setLoad((x) => !x);
          handleOk();
        } else {
          type = "error";
          content = res.message;
        }
        messageApi.open({
          type,
          content,
        });
      });
    };
    return (
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={createUser}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setUser();
              handleCancel();
            }}
          >
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={createUser}>
            Create
          </Button>,
        ]}
      >
        <p>Select employee to create user</p>
        <div className="py-5">
          <Title level={5}>
            Employee <span className="text-red-600">*</span>
          </Title>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            value={user?.id}
            onChange={(value) => setUser({ ...user, id: value })}
            // onSearch={onSearch}
            options={[
              {
                value: "1",
                label: "Jack",
              },
              {
                value: "2",
                label: "Lucy",
              },
              {
                value: "3",
                label: "Tom",
              },
            ]}
          />
          <Title level={5} className="mt-5">
            Username <span className="text-red-600">*</span>
          </Title>
          <Input
            value={user?.username}
            onChange={({ target }) =>
              setUser({ ...user, username: target.value })
            }
            placeholder="Ex- himanshu.singh"
            className="py-1"
          />
        </div>
      </Modal>
    );
  }
);

const RoleAssign = React.memo(
  ({ isModalOpen, handleOk, handleCancel, roleUser, messageApi, setLoad }) => {
    const [roles, setRoles] = useState([]);
    const [checkedList, setCheckedList] = useState([1]);

    useEffect(() => {
      UserService.getRole({ userID: roleUser }, (res) => {
        if (res.status) {
          var check = [];
          setRoles(
            res.data.map((r) => {
              if (r.isSelected) check.push(r.id);
              return { label: r.role, value: r.id };
            })
          );
          setCheckedList(check);
        } else {
        }
      });
    }, [roleUser]);

    const assignRole = () => {
      UserService.assignRole(
        { userId: roleUser, roleIds: checkedList },
        (res) => {
          var type, content;
          if (res.status) {
            type = "success";
            content = "Role assigned successfully";
            setLoad((x) => !x);
            handleOk();
          } else {
            type = "error";
            content = res.message;
          }
          messageApi.open({
            type,
            content,
          });
        }
      );
    };

    return (
      <Modal
        title="Role Assignment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={assignRole}>
            Submit
          </Button>,
        ]}
      >
        <p>Assign Role to User</p>

        <div className="py-5">
          <Title level={5}>
            Select Roles <span className="text-red-600">*</span>
          </Title>
          <Checkbox.Group
            options={roles}
            value={checkedList}
            onChange={(list) => setCheckedList(list)}
          />
        </div>
      </Modal>
    );
  }
);

const AllUser = () => {
  const [rows, setRows] = useState([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleUser, setRoleUser] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setLoading(true);
    UserService.getAllUser({}, (res) => {
      setLoading(false);
      if (res.status) {
        setRows(res.data);
      }
    });
  }, [load]);

  const showRoleModal = (id) => {
    setRoleUser(id);
    setRoleModalOpen(true);
  };
  const handleRoleOk = () => {
    setRoleModalOpen(false);
  };
  const handleRoleCancel = () => {
    setRoleModalOpen(false);
  };

  const showUserModal = () => {
    setUserModalOpen(true);
  };
  const handleUserOk = () => {
    setUserModalOpen(false);
  };
  const handleUserCancel = () => {
    setUserModalOpen(false);
  };

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
                UserService.changeStatus({ status: 2, userId: id }, (res) => {
                  if (res.status) {
                    message.success("User Deactivated");
                    setLoad((x) => !x);
                  } else {
                    message.error("Failed to deactivate user");
                  }
                });
              }}
            >
              Deactivate
            </Button>
            <Button
              type="fn"
              onClick={() => showRoleModal(id)}
              className="text-blue-400 hover:text-blue-700"
            >
              Assign Role
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
            Users
          </Title>
          <Text type="secondary">View all employees user account here</Text>
        </div>
        <div>
          <Button color="primary" variant="outlined" onClick={showUserModal}>
            <UserAddOutlined /> Create User
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
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} users`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
      {contextHolder}
      <UserCreation
        isModalOpen={userModalOpen}
        handleOk={handleUserOk}
        handleCancel={handleUserCancel}
        messageApi={messageApi}
        setLoad={setLoad}
      />
      <RoleAssign
        isModalOpen={roleModalOpen}
        handleOk={handleRoleOk}
        handleCancel={handleRoleCancel}
        roleUser={roleUser}
        messageApi={messageApi}
        setLoad={setLoad}
      />
    </>
  );
};

export default AllUser;
