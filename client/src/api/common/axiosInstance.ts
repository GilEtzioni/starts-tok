import axios from "axios";

const url = process.env.BACKEND_URL || "16.170.202.0";
const axiosInstance = axios.create({
  baseURL: `http://${url}:3000/`, // ROOT URL
  withCredentials: true,
});

export default axiosInstance;