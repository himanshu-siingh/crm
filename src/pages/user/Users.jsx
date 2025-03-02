import {
  Button,
  Checkbox,
  Form,
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
import EmployeeService from "../../services/request/employee";

const UserCreation = React.memo(
  ({
    isModalOpen,
    handleOk,
    handleCancel,
    messageApi,
    setLoad,
    employee,
    roles,
  }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const createUser = (values) => {
      const email = employee.filter((x) => x.id == values.empID)[0]?.email;
      //console.log(email);
      //console.log({ ...values, email: email });
      setLoading(true);
      UserService.createUser({ ...values, email: email }, (res) => {
        var type, content;
        if (res.status) {
          type = "success";
          content = "User created successfully";
          form.resetFields();
          setLoad((x) => !x);
          setLoading(false);
          setIsAdmin(false);
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
        onCancel={handleCancel}
        footer={null}
      >
        <p>Select employee to create user</p>
        <div className="py-5">
          <Form layout="vertical" form={form} onFinish={createUser}>
            <Form.Item
              label="Employee ID"
              name="empID"
              rules={[{ required: true, message: "Please select an employee" }]}
            >
              <Select
                showSearch
                placeholder="Select an Employee"
                optionFilterProp="label"
                options={employee.map((employee) => ({
                  value: employee.id,
                  label: employee.employee_name,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please fill the username" }]}
            >
              <Input placeholder="Ex- himanshu.singh" />
            </Form.Item>
            <Form.Item label="Is Admin" name="isAdmin" valuePropName="checked">
              <Checkbox
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                placeholder="Is Admin"
              >
                is Admin
              </Checkbox>
            </Form.Item>
            {!isAdmin && (
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select
                  showSearch
                  placeholder="Select an Employee"
                  optionFilterProp="label"
                  options={roles.map((role) => ({
                    value: role.id,
                    label: role.role,
                  }))}
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Create User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
);

const RoleAssign = React.memo(
  ({ isModalOpen, handleOk, handleCancel, roleUser, messageApi, setLoad }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
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
          message.error(res.message);
        }
      });
    }, [roleUser]);

    const assignRole = () => {
      setLoading(true);
      UserService.assignRole(
        { userId: roleUser, roleIds: checkedList },
        (res) => {
          setLoading(false);
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
          <Button
            loading={loading}
            key="submit"
            type="primary"
            onClick={assignRole}
          >
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

const Users = () => {
  const [rows, setRows] = useState([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [roleUser, setRoleUser] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [query, setQuery] = useState("");
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
  useEffect(() => {
    EmployeeService.getEmployees((res) => {
      if (res.status) {
        setEmployee(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, []);
  useEffect(() => {
    UserService.getAllRoles((res) => {
      if (res.status) {
        //console.log(res.data);
        setAllRoles(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, []);

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
      render: (d, r, i) => i + 1,
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
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      render: (_, { roles, isAdmin }) => {
        return isAdmin ? (
          <Tag>Administrator</Tag>
        ) : (
          roles.map((role) => {
            return <Tag>{role.name?.toUpperCase()}</Tag>;
          })
        );
      },
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (_, { id, isAdmin }) => {
        return (
          !isAdmin && (
            <Space>
              <Button
                type="link"
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
              <Button type="link" onClick={() => showRoleModal(id)}>
                Assign Role
              </Button>
            </Space>
          )
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Users
          </Title>
          <Text type="secondary">View all employees user account here</Text>
        </div>
        <Space className="flex flex-wrap-reverse">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Username or employee Name to search"
            className="sm:w-[280px]"
          />
          <Button color="primary" variant="outlined" onClick={showUserModal}>
            <UserAddOutlined /> Create User
          </Button>
        </Space>
      </div>
      <div style={{ overflowX: "auto" }} className="max-w-[calc(100vw-40px)]">
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows.filter(
            (row) =>
              row.username.toLowerCase().includes(query.toLowerCase().trim()) ||
              row.empName.toLowerCase().includes(query.toLowerCase().trim())
          )}
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
        employee={employee}
        roles={allRoles}
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

export default Users;
