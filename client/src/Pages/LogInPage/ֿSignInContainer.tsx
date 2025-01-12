import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Form, Input, Button, Alert, Typography, Space, Spin, ConfigProvider } from "antd";
import heIL from "antd/es/locale/he_IL"; // hebrew antd

const { Title } = Typography;

const SignInContainer = () => {
  const signInHook = useSignIn();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!signInHook || !signInHook.signIn) {
    return <Alert message="שגיאה: אימות אינו זמין" type="error" showIcon />;
  }

  const { signIn } = signInHook;

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    setErrorMessage(null);
    setLoading(true);

    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        window.location.href = "/main";
      } else {
        setErrorMessage("תהליך האימות לא הושלם. נסה שוב.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "מייל או סיסמא שגויים. נסה שוב.");
      } else {
        setErrorMessage("אירעה שגיאה לא צפויה.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100" dir="rtl">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            <Title level={3} className="text-center">כניסה</Title>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="מייל"
                name="email"
                rules={[{ required: true, message: "הזן את המייל שלך" }]}
              >
                <Input placeholder="הכנס מייל" type="email" />
              </Form.Item>

              <Form.Item
                label="סיסמא"
                name="password"
                rules={[{ required: true, message: "הזן את הסיסמא שלך" }]}
              >
                <Input.Password placeholder="הכנס סיסמא" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block disabled={loading}>
                  {loading ? <Spin size="small" /> : "כניסה"}
                </Button>
              </Form.Item>
            </Form>
            <Button type="link" block href="/sign-up">
              אין לך משתמש קיים? הירשם כאן
            </Button>
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SignInContainer;
