// src/api/vehicles.js
import http from "./http";

// Get vehicles list (with filters & sorting)
export const fetchVehicles = async (params = {}) => {
  const { data } = await http.get("/vehicles", { params });
  if (Array.isArray(data)) return { items: data, total: data.length };
  return data;
};

// Get single vehicle
export const fetchVehicle = async (id) =>
  (await http.get(`/vehicles/${id}`)).data;

// Create vehicle
export const createVehicle = async (payload) =>
  (await http.post("/vehicles", payload)).data;

// Update vehicle
export const updateVehicle = async (id, payload) =>
  (await http.patch(`/vehicles/${id}`, payload)).data;

// Delete vehicle
export const deleteVehicle = async (id) =>
  (await http.delete(`/vehicles/${id}`)).data;

// Book vehicle directly via this helper (optional)
export const bookVehicle = async (vehicleId, status = "requested") =>
  (await http.post("/bookings", { vehicleId, status })).data;

// Summary endpoint (optional/fallback)
export const fetchVehicleSummary = async (id) => {
  try {
    return (await http.get(`/vehicles/${id}/summary`)).data;
  } catch {
    return null;
  }
};

// Top vehicles for Home page
export const fetchTopVehicles = async (limit = 3) => {
  try {
    const { data } = await http.get("/stats/top-vehicles", {
      params: { limit },
    });
    return data;
  } catch {
    const { data } = await http.get("/vehicles", {
      params: { sortBy: "bookings", sortOrder: "desc", limit },
    });
    if (Array.isArray(data)) return data;
    return data.items || [];
  }
};
