import {
  Button,
  Checkbox,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
const { Text, Title } = Typography;
import React, { useEffect, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import UserService from "../../services/request/user";

const RoleCreation = ({ isModalOpen, handleOk, handleCancel, setLoad }) => {
  const [role, setRole] = useState();
  const createRole = () => {
    UserService.createRole({ role }, (res) => {
      if (res.status) {
        setLoad((load) => !load);
        handleOk();
      } else {
      }
    });
  };

  return (
    <Modal
      title="Create Role"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={createRole}>
          Create
        </Button>,
      ]}
    >
      <p>Role creation form here</p>
      <div className="py-5">
        <Title level={5}>
          Role <span className="text-red-600">*</span>
        </Title>
        <Input
          value={role}
          onChange={({ target }) => setRole(target.value)}
          placeholder="Ex- manager"
          className="py-1"
        />
      </div>
    </Modal>
  );
};
const PermissionAssign = ({
  isModalOpen,
  handleOk,
  handleCancel,
  permissionRole,
  setLoad,
}) => {
  const [permission, setPermission] = useState([]);
  const [checkedList, setCheckedList] = useState([1]);
  const [checkAll, setCheckAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    UserService.getPermission({ roleID: permissionRole }, (res) => {
      if (res.status) {
        var check = [];
        setPermission(
          res.data.map((r) => {
            if (r.isSelected) check.push(r.id);
            return { label: `${r.permission} - ${r.pageId}`, value: r.id };
          })
        );
        setCheckedList(check);
        setCheckAll(res.data.length === check.length);
        setIndeterminate(
          check.length > 0 && !(res.data.length === check.length)
        );
      }
    });
  }, [permissionRole]);

  const AssignPermission = () => {
    UserService.assignPermission(
      { roleID: permissionRole, permissionID: checkedList },
      (res) => {
        if (res.status) {
          message.success("Permission assigned successfully");
          setLoad((x) => !x);
          handleOk();
        } else {
          message.error(res.message);
        }
      }
    );
  };

  const onCheckAllChange = (e) => {
    var ids = permission.map((p) => {
      return p.value;
    });
    setCheckedList(e.target.checked ? ids : []);
    setCheckAll((x) => !x);
    setIndeterminate(false);
  };
  return (
    <Modal
      title="Manage Permission"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Back
        </Button>,
        <Button key="submit" type="primary" onClick={AssignPermission}>
          Assign
        </Button>,
      ]}
    >
      <p>Check Permission to assign </p>
      <div className="py-5">
        <Title level={5}>
          Select Permission <span className="text-red-600">*</span>
        </Title>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Checkbox.Group
          options={permission}
          value={checkedList}
          onChange={(list) => {
            setCheckedList(list);
            setCheckAll(permission.length === list.length);
            setIndeterminate(
              list.length > 0 && !(permission.length === list.length)
            );
          }}
        />
      </div>
    </Modal>
  );
};

const Roles = () => {
  const [rows, setRows] = useState([]);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [permissionRole, setPermissionRole] = useState();
  const [load, setLoad] = useState(false);

  const showRoleModal = () => {
    setRoleModalOpen(true);
  };
  const handleRoleOk = () => {
    setRoleModalOpen(false);
  };
  const handleRoleCancel = () => {
    setRoleModalOpen(false);
  };

  const showPermissionModal = (id) => {
    setPermissionRole(id);
    setPermissionModalOpen(true);
  };
  const handlePermissionOk = () => {
    setPermissionModalOpen(false);
  };
  const handlePermissionCancel = () => {
    setPermissionModalOpen(false);
  };

  useEffect(() => {
    UserService.getAllRoles((res) => {
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    // {
    //   title: "Permission",
    //   key: "permission",
    //   dataIndex: "permission",
    //   render: (_, { permission }) => {
    //     return permission.map((permission) => {
    //       return <Tag>{permission.name}</Tag>;
    //     });
    //   },
    // },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (_, { id }) => {
        return (
          <Space>
            <Button
              type="fn"
              onClick={() => showPermissionModal(id)}
              className="text-blue-400 hover:text-blue-700"
            >
              Add Permission
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
            Roles
          </Title>
          <Text type="secondary">View all roles here</Text>
        </div>
        <div>
          <Button color="primary" variant="outlined" onClick={showRoleModal}>
            <UserAddOutlined /> Create Role
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto", maxWidth: "84vw" }}>
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

      <RoleCreation
        isModalOpen={roleModalOpen}
        handleOk={handleRoleOk}
        handleCancel={handleRoleCancel}
        setLoad={setLoad}
      />

      <PermissionAssign
        isModalOpen={permissionModalOpen}
        handleOk={handlePermissionOk}
        handleCancel={handlePermissionCancel}
        permissionRole={permissionRole}
        setLoad={setLoad}
      />
    </>
  );
};

export default Roles;
