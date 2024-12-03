import React, { useEffect, useState } from "react";
import { Typography, Button, Table, Modal, Input, Select, message } from "antd";
import EmployeeService from "../../services/request/employee";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const sample = [
  { id: 1, name: "SDE - 1", department: "Development", totalEmployee: 12 },
  { id: 1, name: "SDE Trainee", department: "Development", totalEmployee: 50 },
  { id: 1, name: "SDE - 2", department: "Development", totalEmployee: 33 },
];

const AddDesignation = ({
  isModalOpen,
  handleCancel,
  handleOk,
  department,
  setLoad,
}) => {
  const [formdata, setFormdata] = useState();

  const mappedData = department.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const create = () => {
    EmployeeService.createDesignation(formdata, (res) => {
      if (res.status) {
        setFormdata();
        message.success("Designation Added");
        setLoad((x) => !x);
        handleOk();
      } else {
        message.error("Error Adding Designation");
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
        <Button key="submit" type="primary" onClick={create}>
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
          placeholder="Select a person"
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
  const [rows, setRows] = useState(sample);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [department, setDepartment] = useState([]);
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
            type="th"
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
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Button
          type="fgg"
          className=" hover:text-blue-700"
          onClick={() => {
            EmployeeService.deleteDesignation({ id }, (res) => {
              if (res.status) {
                setLoad((x) => !x);
                message.success("Designation Deleted Successfully");
              } else {
                message.error("Error");
              }
            });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    EmployeeService.getDesignation((res) => {
      console.log(res);
      setRows(res.data);
    });
  }, [load]);
  useEffect(() => {
    EmployeeService.getDepartment((res) => {
      if (res.status) {
        setDepartment(res.data);
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
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            + Add Designation
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto", maxWidth: "88vw" }}>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows}
          //   pagination={{
          //     // pageSize: 5,
          //     defaultPageSize: 10,
          //     pageSizeOptions: [10, 25, 50],
          //     showTotal: (total) => `Total ${total} users`,
          //     showQuickJumper: true,
          //     showSizeChanger: true,
          //   }}
          //   loading={loading}
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
