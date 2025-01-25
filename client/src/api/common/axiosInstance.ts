import axios from "axios";

const url = "16.170.202.0";
const axiosInstance = axios.create({
  baseURL: `http://${url}:3000/`,
  withCredentials: true,
});

export default axiosInstance;