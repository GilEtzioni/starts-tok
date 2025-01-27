import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://website-project-backend-two.vercel.app",
  withCredentials: true,
});

export default axiosInstance