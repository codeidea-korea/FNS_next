import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_VITE_DEV_API_URL}`, // 개발 API SERVER
  // baseURL: `${process.env.NEXT_PUBLIC_VITE_PROD_API_URL}`, // 운영 API SERVER
  headers: {
    "system-key": `${process.env.NEXT_PUBLIC_VITE_SYSTEM_KEY}`,
  },
});

export default AxiosInstance;
