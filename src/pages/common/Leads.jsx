import React, { useState } from "react";
import { Table, Input, Select, Button } from "antd";

const { Option } = Select;

const sampleData = [
  {
    key: "1",
    leadId: "L001",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    status: "New",
    createdDate: "2024-11-28",
  },
  {
    key: "2",
    leadId: "L002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "8765432109",
    status: "Contacted",
    createdDate: "2024-11-27",
  },
  {
    key: "3",
    leadId: "L003",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    mobile: "7654321098",
    status: "Qualified",
    createdDate: "2024-11-26",
  },
];

const LeadsPage = () => {
  const [filteredData, setFilteredData] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (value) => {
    const filtered = sampleData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.mobile.includes(value)
    );
    setFilteredData(filtered);
    setSearchTerm(value);
  };

  const handleStatusFilter = (value) => {
    const filtered = sampleData.filter((item) =>
      value ? item.status === value : true
    );
    setFilteredData(filtered);
    setStatusFilter(value);
  };

  const columns = [
    {
      title: "Lead ID",
      dataIndex: "leadId",
      key: "leadId",
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
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "New", value: "New" },
        { text: "Contacted", value: "Contacted" },
        { text: "Qualified", value: "Qualified" },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Leads</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by name, email, or mobile"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Select
            placeholder="Filter by Status"
            onChange={handleStatusFilter}
            value={statusFilter}
            className="w-full md:w-1/4"
            allowClear
          >
            <Option value="New">New</Option>
            <Option value="Contacted">Contacted</Option>
            <Option value="Qualified">Qualified</Option>
          </Select>
          <Button
            onClick={() => {
              setFilteredData(sampleData);
              setSearchTerm("");
              setStatusFilter("");
            }}
            className="w-full md:w-auto bg-gray-200 hover:bg-gray-300"
          >
            Clear Filters
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      </div>
    </div>
  );
};

export default LeadsPage;
