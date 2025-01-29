import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VERCEL_BACK_END_URL || process.env.RENDER_BACK_END_URL,
  withCredentials: true,
});

export default axiosInstance;