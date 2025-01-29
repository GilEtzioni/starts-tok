import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://website-project-n5t7.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;