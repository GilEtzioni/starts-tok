import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // ROOT URL
  withCredentials: true,
});

export default axiosInstance;