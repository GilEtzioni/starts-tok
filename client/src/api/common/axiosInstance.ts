import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://website-project-ngoiyb9o4-giletzionis-projects.vercel.app",
  withCredentials: true,
});

export default axiosInstance;