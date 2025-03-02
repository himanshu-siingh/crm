import React, { useEffect, useState } from "react";
import { Card, Tag, Tabs, message } from "antd";
import FileUploader from "../../components/FileUploader";
import BankDetails from "../../components/profile/BankDetails";
import AddressDetails from "../../components/profile/AddressDetails";
import ChangePassword from "../../components/profile/ChangePassword";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeService from "../../services/request/employee";
import DisplayRow from "../../components/profile/DisplayRow";
import { useAuth } from "../../context/AuthContext";
import SessionService from "../../services/SessionService";

const EmployeeProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || [];
  const { user } = useAuth();
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    if (data.id) {
      EmployeeService.getEmployeeProfile({ id: data?.id }, (res) => {
        if (res.status) {
          setEmployee(res.data);
        } else {
          message.error(res.message);
        }
      });
    } else {
      navigate("/");
    }
  }, [data]);

  const TabData = [
    {
      label: "Bank Details",
      key: "bank",
      children: (
        <BankDetails
          initialBankDetails={{
            id: data?.id,
            bankName: employee.bank_name,
            accountNumber: employee.account_number,
            ifscCode: employee.ifsc,
            accountHolder: employee.employee_name,
          }}
        />
      ),
    },
    {
      label: "Address ",
      key: "address",
      children: (
        <AddressDetails
          initialBankDetails={{
            id: data?.id,
            address1: employee.address1,
            address2: employee.address2,
            landmark: employee.landmark,
            post_office: employee.post_office,
            city: employee.city,
            state: employee.state,
            country: employee.country,
            zip: employee.pincode,
          }}
        />
      ),
    },
    {
      label: "Change Password",
      key: "change_password",
      children: <ChangePassword />,
    },
  ];
  const onUpload = (file) => {
    const formdata = new FormData();
    formdata.append("profile", file);
    formdata.append("id", data?.id);
    formdata.append("name", employee.employee_name);
    EmployeeService.updateProfilePicture(formdata, (res) => {
      if (res.status) {
        //console.log(res.data);
        message.success("Profile Picture updated succesfully");
        SessionService.set.userProfile(res.data?.url);
      } else {
        //console.log(res);
        message.error(res.message);
      }
    });
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Header Section */}
        <div className="grid grid-cols-1">
          <Card className="grid-cols-1  mb-4 shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <FileUploader url={employee.profile} onUpload={onUpload} />
              <div className="md:ml-6 mt-4 text-center">
                <h1 className="text-2xl font-semibold">
                  {employee.employee_name}
                </h1>
                <p className="text-gray-500">
                  {employee.designation} ({employee.department})
                </p>
                <p className="text-gray-400">{employee.city}</p>
              </div>
            </div>
          </Card>
          {/* Personal Bio */}
          <Card title="Personal Details" className="md:col-span-2  shadow-lg">
            <DisplayRow title="Employee Id" value={employee.employeeId} />
            <DisplayRow title="Father Name" value={employee.father_name} />
            <DisplayRow title="Mother Name" value={employee.mother_name} />
            <DisplayRow title="Mobile" value={employee.mobile} />
            <DisplayRow title="Email" value={employee.email} />
            <DisplayRow
              title="Skills"
              value={employee?.skills?.map((skill, index) => (
                <Tag key={index} color="blue">
                  {skill}
                </Tag>
              ))}
            />
          </Card>
        </div>

        {/* Main Content Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <Tabs
            tabPosition={"top"}
            items={TabData.filter((x) =>
              x.key != "change_password" ? true : user.empId == data.id
            )}
            className="m-0"
          />
        </Card>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
