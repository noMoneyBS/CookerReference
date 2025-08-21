// src/api/axios.js
import axios from "axios";
import { API_BASE } from "../config";

// 单例 axios 实例，统一设置 baseURL 到 API_BASE
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // 如需 cookie，可改为 true 并在后端允许
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（可按需保留/精简）
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（可按需保留/精简）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
