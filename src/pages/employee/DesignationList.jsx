import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  Modal,
  Input,
  Select,
  message,
  Popover,
  Popconfirm,
} from "antd";
import EmployeeService from "../../services/request/employee";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const { Title, Text } = Typography;

const AddDesignation = ({
  isModalOpen,
  handleCancel,
  handleOk,
  department,
  setLoad,
}) => {
  const [formdata, setFormdata] = useState();
  const [loading, setLoading] = useState(false);
  const mappedData = department.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const create = () => {
    setLoading(true)
    EmployeeService.createDesignation(formdata, (res) => {
      if (res.status) {
        setFormdata();
        message.success("Designation Added");
        setLoad((x) => !x);
        setLoading(false)
        handleOk();
      } else {
        message.error("Error Adding Designation");
        setLoading(false)
      }
    });
  };

  return (
    <Modal
      title="Add Designation"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={create}>
          Submit
        </Button>,
      ]}
    >
      <p>Add new designation in department</p>
      <div className="py-5">
        <Title level={5}>
          Department <span className="text-red-600">*</span>
        </Title>
        <Select
          showSearch
          placeholder="Select Department"
          optionFilterProp="label"
          value={formdata?.departmentId}
          onChange={(value) =>
            setFormdata({ ...formdata, departmentId: value })
          }
          // onSearch={onSearch}
          options={mappedData}
        />
        <Title level={5} className="mt-2">
          Designation <span className="text-red-600">*</span>
        </Title>
        <Input
          placeholder="Ex- SDE 3"
          className="py-1"
          value={formdata?.designation}
          onChange={({ target }) =>
            setFormdata({ ...formdata, designation: target.value })
          }
        />
        <Title level={5} className="mt-2">
          Hierarcy Level <span className="text-red-600">*</span>
        </Title>
        <Select
          showSearch
          placeholder="Select Level"
          optionFilterProp="label"
          value={formdata?.level}
          onChange={(value) => setFormdata({ ...formdata, level: value })}
          // onSearch={onSearch}
          options={Array.from({ length: 10 }, (_, index) => ({
            value: index + 1,
            label: `Level ${index + 1}`,
          }))}
        />
      </div>
    </Modal>
  );
};

const DesignationList = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "S.no",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text, row) => {
        return (
          <Button
            type="link"
            className="text-black"
            onClick={() => {
              navigate("/employee/department", {
                state: { data: row },
              });
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "No of Employees",
      dataIndex: "totalEmployee",
      key: "totalEmployee",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          {hasPermission("delete:designation") && (
            <Popconfirm
              title="Delete the Designation"
              description="Are you sure to delete this designation?"
              onConfirm={() => {
                EmployeeService.deleteDesignation({ id }, (res) => {
                  if (res.status) {
                    setLoad((x) => !x);
                    message.success("Designation Deleted Successfully");
                  } else {
                    message.error(res.message);
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
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    EmployeeService.getDesignation((res) => {
      setLoading(false);
      if (res.status) {
        setRows(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, [load]);
  useEffect(() => {
    EmployeeService.getDepartment((res) => {
      if (res.status) {
        setDepartment(res.data);
      } else {
        message.error(`${res.message} for department`);
      }
    });
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Designation
          </Title>
          <Text type="secondary">View all available Designation</Text>
        </div>
        <div>
          {hasPermission("add:designation") && (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              + Add Designation
            </Button>
          )}
        </div>
      </div>
      <div style={{ overflowX: "auto" }} className="max-w-[calc(100vw-40px)]">
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} Designation`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
      <AddDesignation
        isModalOpen={open}
        handleCancel={closeModal}
        handleOk={closeModal}
        department={department}
        setLoad={setLoad}
      />
    </div>
  );
};

export default DesignationList;
