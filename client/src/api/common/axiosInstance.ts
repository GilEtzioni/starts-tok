import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://start-tok.onrender.com",
  withCredentials: true,
});

export default axiosInstance;