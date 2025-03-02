import { Button, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import GroupCreation from "../../components/promotional/GroupCreation";
import PromotionalService from "../../services/request/promotional";
const { Text, Title } = Typography;
const Groups = () => {
  const [openCreation, setOpenCreation] = useState(false);
  const [load, setLoad] = useState(false);
  var columns = [
    {
      title: "#",
      dataIndex: "name",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Group Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Group Members Count",
      dataIndex: "user_count",
      key: "members",
    },
    {
      title: "Action",
      dataIndex: "user_count",
      key: "members",
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    PromotionalService.getAllGroups((res) => {
      if (res.status) {
        console.log(res);
        setRows(res.data);
      }
    });
  }, [load]);
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Mail Groups
          </Title>
          <Text type="secondary">View all mail groups here</Text>
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenCreation(true)}
          >
            Create Group
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={rows} />
      <GroupCreation
        open={openCreation}
        handleCancel={() => setOpenCreation(false)}
        setLoad={setLoad}
      />
    </div>
  );
};

export default Groups;
