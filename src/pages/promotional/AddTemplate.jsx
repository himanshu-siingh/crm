import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import pug from "pug-runtime";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Splitter, Form, message } from "antd";
import PromotionalService from "../../services/request/promotional";
import { useLocation } from "react-router-dom";

const AddTemplate = () => {
  const location = useLocation();
  const { template } = location.state || {};
  const [code, setCode] = useState(
    "div\n  h1 Hello, Start Creating your template!"
  );
  const [html, setHtml] = useState("");
  const [data, setdata] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (template && template.name) {
      setCode(template.raw);
      var varb = template?.variables.split(",");

      var temp = {};
      varb?.forEach((item) => {
        temp[item] = "";
      });
      console.log(temp);
      setdata(temp);
    }
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const compile = () => {
    PromotionalService.compilePug({ template: code, data }, (res) => {
      setHtml(res.template);
    });
  };
  const save = (value) => {
    PromotionalService.saveTemplate(
      { template: code, name: value.file, data },
      (res) => {
        if (res.success) {
          message.success("Template saved successfully");
        } else {
          message.error("Error saving template");
        }
      }
    );
  };

  const submission = (value) => {
    if (value?.users?.length) {
      var temp = {};
      value.users.map((row) => {
        temp[row.key] = row.value;
      });
      setdata(temp);
      console.log(temp);
    }
    handleCancel();
  };

  return (
    <>
      <Splitter
        layout={isMobile ? "vertical" : "horizontal"}
        style={{
          height: "70vh",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        className="max-w-[calc(100vw-40px)]"
      >
        <Splitter.Panel>
          <Editor
            className="py-5 bg-[#1E1E1E]"
            language="pug"
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <div className="p-3" dangerouslySetInnerHTML={{ __html: html }} />
        </Splitter.Panel>
      </Splitter>
      <Space className="my-2">
        <Button onClick={compile}>Compile</Button>
        <Button onClick={() => setIsModalOpen(true)}>Add Variable</Button>
        <Form
          initialValues={{ file: template?.name }}
          layout="inline"
          className="float-right"
          onFinish={save}
        >
          <Form.Item name="file">
            <Input disabled={!!template?.name} placeholder="Enter File Name" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Space>
      <Modal
        title="Add Variables"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={submission}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            users: Object.keys(data).map((v) => {
              return { key: v, value: "" };
            }),
          }}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Key",
                        },
                      ]}
                    >
                      <Input placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Value",
                        },
                      ]}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTemplate;
