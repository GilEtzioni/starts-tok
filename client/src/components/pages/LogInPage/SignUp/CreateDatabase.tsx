import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useCreateDataBase } from "../../requests/createDataBase";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateDatabase: React.FC = () => {
  const { Paragraph } = Typography;
  const { userId, getToken } = useAuth();
  const navigate = useNavigate();

  const { mutate: seedDatabase } = useMutation({
    mutationFn: async (): Promise<void> => {
      if (!userId) return;

      const token = await getToken();
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/create-db`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create database");
      }

    },
    onSuccess: () => {
      navigate("/main", { state: { startTour: true } });
    },
  });

  useEffect(() => {
    if (userId) {
      seedDatabase();
    }
  }, [userId, seedDatabase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-12 bg-[hsl(210,40%,96.1%)]">
      <div className="text-8xl font-extrabold tracking-wide relative inline-block mb-12">
        <span className="bg-gradient-to-r from-[hsl(142.1,76.2%,36.3%)] to-[hsl(142.1,70.6%,45.3%)] bg-clip-text text-transparent">
          Starts
        </span>
        <span className="text-black">Tok</span>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Paragraph className="text-2xl text-center">
          אנא המתן
        </Paragraph>
        <Paragraph className="text-2xl text-center">
          האתר יעלה בעוד מספר שניות
        </Paragraph>
      </div>

      <Spin
        indicator={<LoadingOutlined spin className="text-6xl text-[hsl(142.1,70.6%,45.3%)]" />}
        size="large"
      />
    </div>
  );
};

export default CreateDatabase;