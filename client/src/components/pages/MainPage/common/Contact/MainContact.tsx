import React from "react";
import { Form, Input, Button, Card, Select, ConfigProvider } from "antd";
import { SendOutlined } from "@ant-design/icons";
import heIL from "antd/es/locale/he_IL";

const { TextArea } = Input;
const { Option } = Select;

const MainContact: React.FC = () => {

  const { Item } = Form;

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <div className="flex justify-center items-center mt-4">
        <Card
          className="w-full max-w-xl shadow-2xl"
          title="צור קשר"
          bordered={false}
          style={{ textAlign: "right", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)" }}
        >
          <Form layout="vertical" autoComplete="off">
            <Item
              label="בחר נושא"
              name="topic"
            >
              <Select placeholder="בחר נושא">
                <Option value="error">דיווח על תקלה</Option>
                <Option value="collaboration">שיתוף פעולה</Option>
                <Option value="other">אחר</Option>
              </Select>
            </Item>

            <Item
              label="שם מלא"
              name="name"
            >
              <Input placeholder="הזן את שמך המלא" />
            </Item>

            <Item
              label="כתובת אימייל"
              name="email"
              rules={[
                { required: true, message: "אנא הזן כתובת אימייל" },
                { type: "email", message: "אנא הזן כתובת אימייל תקינה" },
              ]}
            >
              <Input placeholder="your@email.com" />
            </Item>

            <Item
              label="תוכן ההודעה"
              name="message"
              rules={[{ required: true, message: "אנא הזן תוכן הודעה" }]}
            >
              <TextArea rows={4} placeholder="כתוב כאן את הודעתך" />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                block
              >
                שלח
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default MainContact;