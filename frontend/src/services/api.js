import axios from "axios";

// Read backend API base URL from Vite environment variable
// If not provided, fallback to http://localhost:5000/api
const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  "http://localhost:5000/api";

// Create a configured Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor:
// Before every outgoing HTTP request, check if a JWT token is stored in localStorage.
// If found, automatically attach it to the request header as: Authorization: Bearer <token>
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // If request setup fails, forward the error
    return Promise.reject(error);
  }
);

export default api;
