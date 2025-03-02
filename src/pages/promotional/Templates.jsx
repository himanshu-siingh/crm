import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "antd";
import PromotionalService from "../../services/request/promotional";
import { useNavigate } from "react-router-dom";
const { Text, Title } = Typography;
const Templates = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    PromotionalService.getAllTemplate((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  }, []);
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Templates
          </Title>
          <Text type="secondary">View all mail templates here</Text>
        </div>
      </div>
      <div className="flex flex-wrap">
        {data.map((template) => {
          return (
            <Card
              key={template.id}
              title={template.name}
              style={{ width: 300, margin: 10 }}
              extra={
                <Button
                  onClick={() => {
                    navigate("/template/create", { state: { template } });
                  }}
                >
                  Edit
                </Button>
              }
            >
              <div dangerouslySetInnerHTML={{ __html: template.template }} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
