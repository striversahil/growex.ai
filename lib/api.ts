import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
