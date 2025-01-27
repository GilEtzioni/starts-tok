import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://website-project-backend-917rn6gy4-giletzionis-projects.vercel.app",
  withCredentials: true,
});

export default axiosInstance;