import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  Modal,
  Input,
  message,
  Popconfirm,
} from "antd";
import EmployeeService from "../../services/request/employee";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const { Title, Text } = Typography;

const AddDepartment = ({ isModalOpen, handleCancel, handleOk, setLoad }) => {
  const [depart, setDepart] = useState();

  const create = () => {
    EmployeeService.createDepartment({ name: depart }, (res) => {
      if (res.status) {
        setDepart();
        message.success("Department Created Successfully");
        setLoad((x) => !x);
        handleOk();
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <Modal
      title="Add Department"
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
      <p>Role creation form here</p>
      <div className="py-5">
        <Title level={5}>
          Department <span className="text-red-600">*</span>
        </Title>
        <Input
          placeholder="Ex- Hiring Resource"
          className="py-1"
          value={depart}
          onChange={({ target }) => {
            setDepart(target.value);
          }}
        />
      </div>
    </Modal>
  );
};

const DepartmentList = () => {
  const { hasPermission } = useAuth();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
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
      title: "Department",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <Button
            type="link"
            className=" text-black hover:text-blue-700"
            onClick={() => {
              navigate("/employee/department", {
                state: {
                  data: {
                    department_id: record.id,
                    department_name: record.name,
                  },
                },
              });
            }}
          >
            {text}
          </Button>
        </>
      ),
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
          {hasPermission("delete:department") && (
            <Popconfirm
              title="Delete the Department"
              description="Are you sure to delete this department?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                EmployeeService.deleteDepartment({ id }, (res) => {
                  if (res.status) {
                    setLoad((x) => !x);
                    message.success("Department Deleted Successfully");
                  } else {
                    message.error(res.message);
                  }
                });
              }}
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
    EmployeeService.getDepartment((res) => {
      if (res.status) {
        setRows(res.data);
      } else {
        message.error(res.message);
      }
      setLoading(false);
    });
  }, [load]);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Department
          </Title>
          <Text type="secondary">View all available departments</Text>
        </div>
        <div>
          {hasPermission("add:department") && (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              + Add Department
            </Button>
          )}
        </div>
      </div>
      <div
        style={{ overflowX: "auto" }}
        className="lg:max-w-[calc(100vw-290px)] max-w-[calc(100vw-40px)]"
      >
        <Table
          className="mt-5"
          columns={columns}
          dataSource={rows}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} Department`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
      <AddDepartment
        isModalOpen={open}
        handleOk={closeModal}
        handleCancel={closeModal}
        setLoad={setLoad}
      />
    </div>
  );
};

export default DepartmentList;
