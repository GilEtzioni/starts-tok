import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.startstok.com",
  withCredentials: true,
});

export default axiosInstance;