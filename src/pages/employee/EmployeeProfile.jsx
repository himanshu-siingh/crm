import React from "react";
import { Card, Descriptions, Button } from "antd";

const EmployeeProfile = () => {
  const employeeData = {
    employeeId: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    designation: "Software Engineer",
    department: "Development",
    dob: "1990-06-15",
    doj: "2022-01-10",
    fatherName: "Michael Doe",
    motherName: "Sarah Doe",
    aadharNumber: "1234-5678-9012",
    panNumber: "ABCDE1234F",
    bankName: "XYZ Bank",
    accountNumber: "123456789012",
    ifscCode: "XYZB0001234",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
    },
  };

  const handleEdit = (section) => {
    console.log(`Edit ${section} clicked!`);
    // Add logic to open a modal or navigate to an edit page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Employee Profile
        </h2>

        {/* Personal Details */}
        <Card
          title="Personal Details"
          extra={
            <Button
              type="primary"
              onClick={() => handleEdit("Personal Details")}
            >
              Edit
            </Button>
          }
          className="mb-6"
        >
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Employee ID">
              {employeeData.employeeId}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {employeeData.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {employeeData.email}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">
              {employeeData.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {employeeData.designation}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {employeeData.department}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {employeeData.dob}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Joining">
              {employeeData.doj}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Name">
              {employeeData.fatherName}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Name">
              {employeeData.motherName}
            </Descriptions.Item>
            <Descriptions.Item label="Aadhar Number">
              {employeeData.aadharNumber}
            </Descriptions.Item>
            <Descriptions.Item label="PAN Number">
              {employeeData.panNumber}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Bank Details */}
        <Card
          title="Bank Details"
          extra={
            <Button type="primary" onClick={() => handleEdit("Bank Details")}>
              Edit
            </Button>
          }
          className="mb-6"
        >
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Bank Name">
              {employeeData.bankName}
            </Descriptions.Item>
            <Descriptions.Item label="Account Number">
              {employeeData.accountNumber}
            </Descriptions.Item>
            <Descriptions.Item label="IFSC Code">
              {employeeData.ifscCode}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Address */}
        <Card
          title="Address"
          extra={
            <Button type="primary" onClick={() => handleEdit("Address")}>
              Edit
            </Button>
          }
          className="mb-6"
        >
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Street">
              {employeeData.address.street}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {employeeData.address.city}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {employeeData.address.state}
            </Descriptions.Item>
            <Descriptions.Item label="Postal Code">
              {employeeData.address.postalCode}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeProfile;
