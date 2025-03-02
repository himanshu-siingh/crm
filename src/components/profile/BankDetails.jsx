import React, { useEffect, useState } from "react";
import { Card, Input, Button, Form, Typography, message } from "antd";
import DisplayRow from "./DisplayRow";
import EmployeeService from "../../services/request/employee";

const BankDetails = ({ initialBankDetails, onSave }) => {
  const [bankDetails, setBankDetails] = useState({});
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setBankDetails(initialBankDetails);
  }, [initialBankDetails]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      EmployeeService.updateBankDetail(
        {
          ...values,
          id: initialBankDetails.id,
        },
        (res) => {
          if (res.status) {
            message.success("Bank Details updated");
            setBankDetails(values);
            setEditing(false);
          } else {
            message.error(res.message);
          }
        }
      );
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <>
      {editing ? (
        <Form form={form} layout="vertical" initialValues={bankDetails}>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[
              { required: true, message: "Please enter the account number!" },
            ]}
          >
            <Input placeholder="Enter Account Number" />
          </Form.Item>
          <Form.Item
            name="ifscCode"
            label="IFSC Code"
            rules={[{ required: true, message: "Please enter the IFSC code!" }]}
          >
            <Input placeholder="Enter IFSC Code" />
          </Form.Item>
          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true, message: "Please enter the bank name!" }]}
          >
            <Input placeholder="Enter Bank Name" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <DisplayRow
            title="Account Holder Name"
            value={initialBankDetails.accountHolder}
          />
          <DisplayRow
            title="Account Number"
            value={bankDetails.accountNumber}
          />
          <DisplayRow title="IFSC Code" value={bankDetails.ifscCode} />
          <DisplayRow title="Bank Name" value={bankDetails.bankName} />
          <Button className="mt-2" type="primary" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}
    </>
  );
};

export default BankDetails;
