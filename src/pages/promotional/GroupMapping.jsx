import { Button, Select, Table, Transfer, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./GroupMapping.css";
import PromotionalService from "../../services/request/promotional";
const { Text, Title } = Typography;
const GroupMapping = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [isUnsaved, setIsUnsaved] = useState(true);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState();

  const filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1;
  const handleChange = (newTargetKeys) => {
    setIsUnsaved(true);
    setTargetKeys(newTargetKeys);
  };

  const loadUsers = (value) => {
    if (isUnsaved) {
      alert("Unsaved Changes");
      return;
    }
    setGroup(value);
    const group = groups.filter((x) => x.id == value)[0];
    PromotionalService.getGroup(group, (res) => {
      if (res.status) {
        setMockData(
          res.data.map((item) => {
            return {
              key: item.id,
              title: item.name,
              value: item.email,
            };
          })
        );
        setTargetKeys(
          res.data.filter((item) => item.selected).map((item) => item.id)
        );
      }
    });
  };

  useEffect(() => {
    PromotionalService.getAllGroups((res) => {
      if (res.status) {
        setGroups(res.data);
      }
    });
  }, []);

  const saveMapping = () => {
    setIsUnsaved(false);
    console.log(targetKeys, group);
    PromotionalService.assignUserToGroup(
      { groupId: group, userIds: targetKeys },
      (res) => {
        if (res.status) {
          console.log(res.data);
        }
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Mail Group Mapping
          </Title>
          <Text type="secondary">Map user and groups here</Text>
        </div>
        <div className="min-w-48">
          <Select
            value={group}
            options={groups.map((row) => {
              return { label: row.name, value: row.id, category: row.category };
            })}
            placeholder="Select Group"
            className="w-10"
            onChange={loadUsers}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%", // Full width container
          maxWidth: "100%", // Ensure it respects its parent's width
          overflow: "hidden", // Prevent overflow issues
        }}
        className="mt-2"
      >
        <Transfer
          style={{
            width: "100%",
          }}
          className="custom-transfer"
          titles={["All Users", "Group Users"]}
          dataSource={mockData}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          //   onSearch={handleSearch}
          render={(item) => item.title}
        />
        <Button onClick={saveMapping} className="my-2 float-end">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GroupMapping;
