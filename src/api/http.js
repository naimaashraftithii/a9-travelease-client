// src/api/http.js
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
});

// Attach Firebase ID token from localStorage (set by AuthProvider)
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
