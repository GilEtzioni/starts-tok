import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://website-project-backend-two.vercel.app", // backend deployment domain
  withCredentials: true,
});

export default axiosInstance;