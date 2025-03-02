import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import GroupCreation from "../../components/promotional/GroupCreation";
const { Text, Title } = Typography;
const GroupMapping = () => {
  const [openCreation, setOpenCreation] = useState(false);
  const categories = [
    {
      label: "Employee",
      value: "employee",
    },
    {
      label: "Leads",
      value: "leads",
    },
    {
      label: "Clients",
      value: "clients",
    },
  ];
  var columns = [
    {
      title: "#",
      dataIndex: "name",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) =>
        categories.filter((x) => x.value == text)[0]?.label,
      filters: categories.map((x) => {
        return { value: x.value, text: x.label };
      }),
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
  ];

  var rows = [
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@example.com",
      group: "Group 1",
      category: "employee",
    },
    {
      key: "2",
      name: "John Blue",
      email: "john.brown@example.com",
      group: "Group 2",
      category: "leads",
    },
  ];
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Mail Group Mapping
          </Title>
          <Text type="secondary">Map user and groups here</Text>
        </div>
      </div>
      <Table columns={columns} dataSource={rows} />
      <GroupCreation
        open={openCreation}
        handleCancel={() => setOpenCreation(false)}
      />
    </div>
  );
};

export default GroupMapping;
