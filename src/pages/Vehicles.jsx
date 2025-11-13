import axios from "axios";
import { auth } from "../firebase/firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
});

// attach JWT if present, else try to fetch a fresh one
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("idToken");
  if (!token && auth?.currentUser) {
    token = await auth.currentUser.getIdToken(true);
    localStorage.setItem("idToken", token);
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -------- VEHICLES --------
export const fetchVehicles = async (params = {}) =>
  (await api.get("/vehicles", { params })).data;

export const fetchVehicle = async (id) =>
  (await api.get(`/vehicles/${id}`)).data;

export const addVehicle = async (payload) =>
  (await api.post("/vehicles", payload)).data;
export const createVehicle = addVehicle;

export const updateVehicle = async (id, payload) =>
  (await api.patch(`/vehicles/${id}`, payload)).data;

export const deleteVehicle = async (id) =>
  (await api.delete(`/vehicles/${id}`)).data;

// -------- BOOKINGS --------
export const bookVehicle = async (vehicleId, status) =>
  (await api.post("/bookings", { vehicleId, status })).data;

export const fetchVehicleSummary = async (id) =>
  (await api.get(`/vehicles/${id}/summary`)).data;

export const fetchTopVehicles = async (limit = 3) =>
  (await api.get("/stats/top-vehicles", { params: { limit } })).data;

export default api;
