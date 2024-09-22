import axios, { AxiosInstance } from "axios";

const nestBaseURL = "https://site-keeper-nestjs.onrender.com/";
// const nestBaseURL = "http://localhost:3000/";
const javaBaseURL = "https://site-keeper-springboot.onrender.com/api/";

const axiosNestInstance: AxiosInstance = axios.create({
  baseURL: nestBaseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosJavaInstance: AxiosInstance = axios.create({
  baseURL: javaBaseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosNestInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosJavaInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {axiosNestInstance, axiosJavaInstance}