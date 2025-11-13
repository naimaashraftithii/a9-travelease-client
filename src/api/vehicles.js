// src/api/vehicles.js (what you already have is OK)
import http from "./http";

export const fetchVehicles = async (params = {}) => {
  const { data } = await http.get("/vehicles", { params });
  if (Array.isArray(data)) return { items: data, total: data.length };
  return data;
};

export const fetchVehicle = async (id) =>
  (await http.get(`/vehicles/${id}`)).data;

export const createVehicle = async (payload) =>
  (await http.post("/vehicles", payload)).data;

export const updateVehicle = async (id, payload) =>
  (await http.patch(`/vehicles/${id}`, payload)).data;

export const deleteVehicle = async (id) =>
  (await http.delete(`/vehicles/${id}`)).data;

export const bookVehicle = async (vehicleId, status) =>
  (await http.post("/bookings", { vehicleId, status })).data;

export const fetchVehicleSummary = async (id) => {
  try {
    return (await http.get(`/vehicles/${id}/summary`)).data;
  } catch {
    return null;
  }
};

export const fetchTopVehicles = async (limit = 3) => {
  try {
    const { data } = await http.get("/stats/top-vehicles", { params: { limit } });
    return data;
  } catch {
    const { data } = await http.get("/vehicles", {
      params: { sortBy: "bookings", sortOrder: "desc", limit },
    });
    return Array.isArray(data) ? data : data.items || [];
  }
};
