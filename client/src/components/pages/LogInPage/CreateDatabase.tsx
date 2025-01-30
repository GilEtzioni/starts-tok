import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const CreateDatabase: React.FC = () => {
  const { userId, getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Token: ", token);
    };

    fetchToken();
  }, [getToken]);

  useEffect(() => {
    const seedDatabase = async (): Promise<void> => {
      if (!userId) return;

      try {
        const token = await getToken();
        const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/create-db`, {
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

        console.log("Database successfully created");
        navigate("/main"); // Redirect to main page
      } catch (error) {
        console.error("Error creating database:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      seedDatabase();
    }
  }, [userId, navigate, getToken]);

  return <div>{loading ? "Setting up your data..." : "Redirecting..."}</div>;
};

export default CreateDatabase;
