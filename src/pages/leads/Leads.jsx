import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { PhoneOutlined, MailOutlined, UploadOutlined } from "@ant-design/icons";
import DragNdrop from "../../components/DragNdrop";
import LeadService from "../../services/request/leads";
import "react-quill/dist/quill.snow.css"; // For Snow Theme
import ReactQuill from "react-quill";
import quillConfig from "../../extras/quillConfig";
import AddMeeting from "../../components/AddMeeting";
import {
  FollowUpModes,
  LeadSources,
  LeadStatuses,
  LeadTags,
} from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FileUploader from "../../components/FileUploader";

const { Title, Text } = Typography;
const Leads = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [followUpForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [openAdd, setAddOpen] = useState(false);
  const [openFollowup, setFollowupOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [generationType, setGenerationType] = useState("form");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedLead, setSelectedLead] = useState();
  const [openLogoModal, setOpenLogoModel] = useState(false);
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFollowupClose = () => {
    setFollowupOpen(false);
  };
  const onOpenLogoModal = (lead) => {
    setOpenLogoModel(true);
    setSelectedLead(lead);
  };
  const onCloseLogoModal = () => {
    setOpenLogoModel(false);
    setSelectedLead();
  };
  const onFollowupOpen = (lead) => {
    followUpForm.setFieldValue("lead_id", lead.id);
    followUpForm.setFieldValue("status", lead.status);
    setFollowupOpen(true);
  };

  const [imageUrl, setImageUrl] = useState();
  const handleFileChange = (info) => {
    //console.log(info);
    if (info.file.status === "removed") {
      setFile(null);
    } else if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };
  const handleAddLeads = (values) => {
    if (values.source == "other") {
      values.source = values.others;
    }
    values.tags = values.tags.toString();
    LeadService.addLeads(values, (res) => {
      if (res.status) {
        onClose();
        form.resetFields();
        setLoad((v) => !v);
        message.success("Lead Added Successfully");
      } else {
        message.error(res.message);
      }
    });
  };

  const handlFollowup = (values) => {
    LeadService.addFollowUp(values, (res) => {
      if (res.status) {
        followUpForm.resetFields();
        onFollowupClose();
        message.success("Followup Added Successfully");
      } else {
        message.error(res.message);
      }
    });
  };
  useEffect(() => {
    setLoading(true);
    LeadService.getLeads((res) => {
      if (res.status) {
        setLoading(false);
        setRows(res.data);
      } else {
        message.error(res.message);
      }
    });
  }, [load]);

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "contact_name",
      key: "employeeId",
      render: (text, { id }) => {
        return (
          <Button
            type="link"
            onClick={() => {
              navigate("../lead", {
                state: { id: id },
              });
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <>
          <MailOutlined /> {text}
        </>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: 120,
      render: (text) => (
        <>
          <PhoneOutlined /> {text}
        </>
      ),
    },
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company_name",
      render: (company, row) => {
        return (
          <>
            <div className="flex items-center">
              <Avatar
                src={row.logo ?? "https://placehold.co/400x400/png"}
                className="min-w-8"
              />
              <span className="ml-1 line-clamp-1">{company}</span>
            </div>
          </>
        );
      },
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text) => (
        <>{LeadSources.filter((sou) => sou.value == text)[0]?.label}</>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return <Tag className="m-1 px-2">{LeadStatuses[status - 1].label}</Tag>;
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => {
        return tags?.split(",").map((tag) => {
          return (
            <Tag className="m-1 px-2" color={LeadTags[tag - 1].color}>
              {LeadTags[tag - 1].label}
            </Tag>
          );
        });
      },
    },
    {
      title: "Action",
      dataIndex: "department",
      key: "department",
      width: 140,
      render: (text, row) => {
        return (
          <>
            {hasPermission("add:lead:followup") && (
              <Button type="link" onClick={() => onFollowupOpen(row)}>
                Follow-up
              </Button>
            )}
            <Button type="link" onClick={() => onOpenLogoModal(row)}>
              Update Logo
            </Button>
            {hasPermission("add:lead:meeting") && (
              <Button
                type="link"
                onClick={() => {
                  setAddOpen(true);
                  addForm.setFieldValue("lead", row.id);
                }}
              >
                Schedule Meeting
              </Button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Leads
          </Title>
          <Text type="secondary">View all leads here</Text>
        </div>
        <Space className="flex flex-wrap">
          {/* <Select placeholder="Select Employee">
            <Option>Select Employee</Option>
          </Select> */}
          {hasPermission("add:leads") && (
            <Button color="primary" variant="outlined" onClick={showDrawer}>
              Create Lead
            </Button>
          )}
        </Space>
      </div>

      <div
        style={{ overflowX: "auto" }}
        className="lg:max-w-[calc(100vw-290px)] max-w-[calc(100vw-40px)]"
      >
        <Table
          showHeader={true}
          className="mt-5"
          columns={columns}
          dataSource={rows.map((row) => {
            return { ...row, key: row.id };
          })}
          size="small"
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showTotal: (total) => `Total ${total} users`,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
      <Modal
        open={openLogoModal}
        onCancel={onCloseLogoModal}
        footer={[]}
        title="Update Logo"
      >
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            LeadService.updateLogo(formData, (res) => {
              if (res.status) {
                message.success("Logo Updated successfully");
                onCloseLogoModal();
                setLoad((v) => !v);
              } else {
                message.error(res.message);
              }
            });
          }}
        >
          <FileUploader url={selectedLead?.logo} />
          <input value={selectedLead?.id} className="hidden" name="id" />
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </form>
      </Modal>

      <Drawer
        title="Add new Leads"
        width={400}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {/* <Radio.Group
          onChange={(e) => {
            setGenerationType(e.target.value);
          }}
          value={generationType}
        >
          <Radio value="form">Form</Radio>
          <Radio value="file">File Import</Radio>
        </Radio.Group> */}
        <div className="py-2">
          {generationType == "form" ? (
            <Form layout="vertical" form={form} onFinish={handleAddLeads}>
              <Form.Item
                label="Contact Name"
                name="contactName"
                rules={[
                  { required: true, message: "Enter contact person name" },
                ]}
              >
                <Input placeholder="Contact Person Name" />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, message: "Enter company name" }]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Enter contact person email" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Enter contact person mobile number",
                  },
                ]}
              >
                <Input placeholder="Enter mobile number" />
              </Form.Item>
              <Form.Item
                label="Tags"
                name="tags"
                rules={[{ required: true, message: "Select at least one tag" }]}
              >
                <Select
                  mode="tags"
                  placeholder="Select Lead Tags"
                  options={LeadTags}
                />
              </Form.Item>
              <Form.Item
                label="Source"
                name="source"
                rules={[{ required: true, message: "Select lead source" }]}
              >
                <Select
                  options={LeadSources}
                  placeholder="Select Source"
                  onChange={(text) => {
                    setSelectedSource(text);
                  }}
                />
              </Form.Item>
              {selectedSource == "other" && (
                <Form.Item
                  label="Source"
                  name="other"
                  rules={[
                    { required: true, message: "Enter name of other source" },
                  ]}
                >
                  <Input placeholder="Enter other source" />
                </Form.Item>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <DragNdrop />
          )}
        </div>
      </Drawer>

      <Drawer
        title="Follow up"
        width={400}
        onClose={onFollowupClose}
        open={openFollowup}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <div className="py-2">
          <Form layout="vertical" form={followUpForm} onFinish={handlFollowup}>
            <Form.Item
              label="Lead"
              name="lead_id"
              rules={[{ required: true, message: "Select Lead name" }]}
            >
              <Select
                disabled
                options={rows.map((row) => {
                  return { value: row.id, label: row.company_name };
                })}
              />
            </Form.Item>
            <Form.Item
              label="Contact Name"
              name="contact_name"
              rules={[{ required: true, message: "Enter contact person name" }]}
            >
              <Input placeholder="Contact Person Name" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Enter lead current status" }]}
            >
              <Select options={LeadStatuses} placeholder="Select Source" />
            </Form.Item>
            <Form.Item
              label="Mode"
              name="mode"
              rules={[{ required: true, message: "Select followup mode" }]}
            >
              <Select
                options={FollowUpModes}
                placeholder="Select Source"
                onChange={(text) => {
                  setSelectedSource(text);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Follow-up Notes"
              name="notes"
              rules={[
                { required: true, message: "Enter name of other source" },
              ]}
            >
              <ReactQuill
                theme="snow"
                modules={quillConfig.modules}
                formats={quillConfig.formats}
                placeholder="Write something amazing..."
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
      <Drawer
        open={openAdd}
        title="Schedule Meeting"
        onClose={() => setAddOpen(false)}
      >
        <AddMeeting form={addForm} disabled={true} />
      </Drawer>
    </div>
  );
};

export default Leads;
