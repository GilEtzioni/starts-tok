import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACK_END_URL}`,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json", },
});

export default axiosInstance;