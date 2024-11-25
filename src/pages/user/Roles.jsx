import { Button, Input, Modal, Space, Table, Tag, Typography } from "antd";
const { Text, Title } = Typography;
import React, { useEffect, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import UserService from "../../services/request/user";

const dummyData = [
  {
    role: "admin",
    id: 1,
    permission: [
      { id: 1, pageID: 1001, permission: "User Creation" },
      { id: 2, pageID: 1002, permission: "User Deletion" },
      { id: 3, pageID: 1003, permission: "Employee Creation" },
      { id: 4, pageID: 1004, permission: "Employee Deletion" },
      { id: 5, pageID: 1005, permission: "Manage Roles" },
      { id: 6, pageID: 1006, permission: "View Reports" },
      { id: 7, pageID: 1007, permission: "Audit Logs" },
      { id: 8, pageID: 1008, permission: "System Configuration" },
      { id: 9, pageID: 1009, permission: "Data Backup" },
      { id: 10, pageID: 1010, permission: "Send Notifications" },
    ],
  },
  {
    role: "manager",
    id: 2,
    permission: [
      { id: 1, pageID: 1101, permission: "View Employees" },
      { id: 2, pageID: 1102, permission: "Approve Leave" },
      { id: 3, pageID: 1103, permission: "Generate Reports" },
      { id: 4, pageID: 1104, permission: "Assign Tasks" },
      { id: 5, pageID: 1105, permission: "Review Performance" },
      { id: 6, pageID: 1106, permission: "Conduct Meetings" },
      { id: 7, pageID: 1107, permission: "Manage Budgets" },
      { id: 8, pageID: 1108, permission: "Set Goals" },
      { id: 9, pageID: 1109, permission: "Edit Projects" },
      { id: 10, pageID: 1110, permission: "Feedback Collection" },
    ],
  },
  {
    role: "employee",
    id: 3,
    permission: [
      { id: 1, pageID: 1201, permission: "View Personal Info" },
      { id: 2, pageID: 1202, permission: "Submit Leave Request" },
      { id: 3, pageID: 1203, permission: "Update Personal Info" },
      { id: 4, pageID: 1204, permission: "View Payslips" },
      { id: 5, pageID: 1205, permission: "Request Training" },
      { id: 6, pageID: 1206, permission: "Take Feedback" },
      { id: 7, pageID: 1207, permission: "Participate in Surveys" },
      { id: 8, pageID: 1208, permission: "Access Team Calendar" },
      { id: 9, pageID: 1209, permission: "Chat with HR" },
      { id: 10, pageID: 1210, permission: "Update Skills" },
    ],
  },
  {
    role: "hr",
    id: 4,
    permission: [
      { id: 1, pageID: 1301, permission: "User Management" },
      { id: 2, pageID: 1302, permission: "View Employee Records" },
      { id: 3, pageID: 1303, permission: "Conduct Interviews" },
      { id: 4, pageID: 1304, permission: "Manage Onboarding" },
      { id: 5, pageID: 1305, permission: "Track Employee Performance" },
      { id: 6, pageID: 1306, permission: "Organize Training" },
      { id: 7, pageID: 1307, permission: "Compensation Management" },
      { id: 8, pageID: 1308, permission: "Employee Relations" },
      { id: 9, pageID: 1309, permission: "Policy Updates" },
      { id: 10, pageID: 1310, permission: "Exit Interviews" },
    ],
  },
  {
    role: "developer",
    id: 5,
    permission: [
      { id: 1, pageID: 1401, permission: "Write Code" },
      { id: 2, pageID: 1402, permission: "Access Repositories" },
      { id: 3, pageID: 1403, permission: "Review Code" },
      { id: 4, pageID: 1404, permission: "Deploy Applications" },
      { id: 5, pageID: 1405, permission: "Update Documentation" },
      { id: 6, pageID: 1406, permission: "Attend Stand-ups" },
      { id: 7, pageID: 1407, permission: "Track Bugs" },
      { id: 8, pageID: 1408, permission: "Manage Tasks" },
      { id: 9, pageID: 1409, permission: "Collaborate with Teams" },
      { id: 10, pageID: 1410, permission: "Integrate APIs" },
    ],
  },
  {
    role: "sales",
    id: 6,
    permission: [
      { id: 1, pageID: 1501, permission: "Access Leads" },
      { id: 2, pageID: 1502, permission: "Update CRM" },
      { id: 3, pageID: 1503, permission: "Schedule Appointments" },
      { id: 4, pageID: 1504, permission: "Generate Quotes" },
      { id: 5, pageID: 1505, permission: "Submit Orders" },
      { id: 6, pageID: 1506, permission: "Coordinate with Marketing" },
      { id: 7, pageID: 1507, permission: "Perform Follow-ups" },
      { id: 8, pageID: 1508, permission: "Compile Sales Reports" },
      { id: 9, pageID: 1509, permission: "Market Analysis" },
      { id: 10, pageID: 1510, permission: "Customer Feedback" },
    ],
  },
  {
    role: "marketing",
    id: 7,
    permission: [
      { id: 1, pageID: 1601, permission: "Manage Campaigns" },
      { id: 2, pageID: 1602, permission: "Analyze Data" },
      { id: 3, pageID: 1603, permission: "Create Content" },
      { id: 4, pageID: 1604, permission: "Social Media Management" },
      { id: 5, pageID: 1605, permission: "Email Marketing" },
      { id: 6, pageID: 1606, permission: "Design Graphics" },
      { id: 7, pageID: 1607, permission: "Plan Events" },
      { id: 8, pageID: 1608, permission: "Customer Research" },
      { id: 9, pageID: 1609, permission: "Brand Management" },
      { id: 10, pageID: 1610, permission: "Budget Management" },
    ],
  },
  {
    role: "finance",
    id: 8,
    permission: [
      { id: 1, pageID: 1701, permission: "Manage Accounts" },
      { id: 2, pageID: 1702, permission: "Budget Planning" },
      { id: 3, pageID: 1703, permission: "Expense Tracking" },
      { id: 4, pageID: 1704, permission: "Financial Reporting" },
      { id: 5, pageID: 1705, permission: "Tax Compliance" },
      { id: 6, pageID: 1706, permission: "Audit Preparation" },
      { id: 7, pageID: 1707, permission: "Cash Flow Management" },
      { id: 8, pageID: 1708, permission: "Investment Tracking" },
      { id: 9, pageID: 1709, permission: "Forecasting" },
      { id: 10, pageID: 1710, permission: "Risk Assessment" },
    ],
  },
  {
    role: "logistics",
    id: 9,
    permission: [
      { id: 1, pageID: 1801, permission: "Manage Inventory" },
      { id: 2, pageID: 1802, permission: "Coordinate Shipments" },
      { id: 3, pageID: 1803, permission: "Supplier Management" },
      { id: 4, pageID: 1804, permission: "Track Deliveries" },
      { id: 5, pageID: 1805, permission: "Order Fulfillment" },
      { id: 6, pageID: 1806, permission: "Logistics Planning" },
      { id: 7, pageID: 1807, permission: "Warehouse Management" },
      { id: 8, pageID: 1808, permission: "Safety Compliance" },
      { id: 9, pageID: 1809, permission: "Cost Analysis" },
      { id: 10, pageID: 1810, permission: "Reporting" },
    ],
  },
  {
    role: "support",
    id: 10,
    permission: [
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
    ],
  },
];

// Example output
console.log(dummyData);

// Example output
console.log(dummyData);

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
}) => {
  return (
    <Modal
      title="Manage Permission"
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
      <p>Assign/Add Permission to specific role here </p>
      <p>BTW, it for user id {permissionRole}</p>
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
        console.log(res.data);
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
        {console.log(rows)}
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
      />
    </>
  );
};

export default Roles;
