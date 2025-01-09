import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Form, Input, Button, Alert, Typography, Space, Spin, ConfigProvider } from "antd";
import heIL from "antd/es/locale/he_IL"; // Hebrew locale for Ant Design

const { Title } = Typography;

const SignUpContainer = () => {
  const signUpHook = useSignUp();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!signUpHook || !signUpHook.signUp) {
    return <Alert message="שגיאה: אימות אינו זמין" type="error" showIcon />;
  }

  const { signUp } = signUpHook;

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    setErrorMessage(null);
    setLoading(true);

    try {

      const result = await signUp.create({ emailAddress: email, password });

      if (result.status === "missing_requirements") {
        const missingFields = result.requiredFields;

        if (missingFields.length > 0) {
          throw new Error(`ההרשמה חסרה שדות נדרשים: ${missingFields.join(", ")}`);
        }
      }

      if (result.status === "complete") {
        window.location.href = "/main";
      } else {
        setErrorMessage("ההרשמה לא הושלמה. אנא בדוק את הדוא\"ל שלך לאימות.");
      }
    } catch (error: any) {
      setErrorMessage(
        error.errors?.[0]?.message || "אירעה שגיאה במהלך ההרשמה. נסה שוב."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100" dir="rtl">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            <Title level={3} className="text-center">הרשמה</Title>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="מייל"
                name="email"
                rules={[{ required: true, message: "אנא הזן את כתובת הדוא\"ל שלך" }]}
              >
                <Input placeholder="הזן את המייל שלך" type="email" />
              </Form.Item>

              <Form.Item
                label="סיסמא"
                name="password"
                rules={[{ required: true, message: "אנא הזן סיסמא" }]}
              >
                <Input.Password placeholder="הזן את הסיסמא שלך" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block disabled={loading}>
                  {loading ? <Spin size="small" /> : "הרשמה"}
                </Button>
              </Form.Item>
            </Form>
            <Button type="link" block href="/sign-in">
              כבר יש לך חשבון? התחבר כאן
            </Button>
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SignUpContainer;
