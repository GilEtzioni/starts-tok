import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://website-project-backend-two.vercel.app",
    // "http://localhost:3000/",
    //  ||  "https://website-project-backend-two.vercel.app",
  withCredentials: true,
});

export default axiosInstance;
