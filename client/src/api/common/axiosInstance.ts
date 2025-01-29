import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACK_END_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const { getToken } = useAuth();
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting Clerk token:', error);
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;