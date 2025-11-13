
import axios from "axios";


const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
});


http.interceptors.request.use((config) => {
const token = localStorage.getItem("idToken");
config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
