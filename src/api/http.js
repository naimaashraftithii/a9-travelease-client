
import axios from "axios";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase";

const auth = getAuth(app);

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
});


http.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.warn("Could not attach auth token:", e?.message);
  }
  return config;
});

export default http;
