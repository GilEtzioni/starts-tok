import { useAuth } from "@clerk/clerk-react";

export const useWithAuth = () => {
  const { getToken } = useAuth();

  return async <T,>(apiFunction: (token: string) => Promise<T>): Promise<T | null> => {
    const token = await getToken();
    if (!token) {
      console.error("Failed to retrieve token.");
      return null;
    }
    return apiFunction(token);
  };
};