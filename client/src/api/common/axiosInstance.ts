import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACK_END_URL}/api`,
  withCredentials: true,
});

export default axiosInstance;