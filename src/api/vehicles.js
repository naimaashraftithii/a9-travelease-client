// src/api/vehicles.js
import http from "./http";

// ========== LIST VEHICLES ==========
export const fetchVehicles = async (params = {}) => {
  const { data } = await http.get("/vehicles", { params });
  if (Array.isArray(data)) return { items: data, total: data.length };
  return data; // { items: [...] }
};

// ========== SINGLE VEHICLE ==========
export const fetchVehicle = async (id) =>
  (await http.get(`/vehicles/${id}`)).data;

// ========== CRUD ==========
export const createVehicle = async (payload) =>
  (await http.post("/vehicles", payload)).data;

export const updateVehicle = async (id, payload) =>
  (await http.patch(`/vehicles/${id}`, payload)).data;

export const deleteVehicle = async (id) =>
  (await http.delete(`/vehicles/${id}`)).data;

// ========== SUMMARY (optional) ==========
export const fetchVehicleSummary = async (id) => {
  try {
    return (await http.get(`/vehicles/${id}/summary`)).data;
  } catch {
    return null;
  }
};

// ========== LATEST & TOP VEHICLES FOR HOME ==========
export const fetchLatestVehicles = async () => {
  // matches app.get("/latest-vehicles", ...)
  const { data } = await http.get("/latest-vehicles");
  return Array.isArray(data) ? data : data.items || [];
};

// by: "booked" | "rating"
export const fetchTopVehicles = async (by = "booked") => {
  if (by === "booked") {
    // matches app.get("/stats/top-vehicles", ...)
    const { data } = await http.get("/stats/top-vehicles", {
      params: { limit: 3 },
    });
    return Array.isArray(data) ? data : data.items || [];
  }

  if (by === "rating") {
    // you don't have a special rating route, so reuse /vehicles sorted
    const { data } = await http.get("/vehicles", {
      params: { sortBy: "rating", sortOrder: "desc", limit: 3 },
    });
    if (Array.isArray(data)) return data;
    return data.items || [];
  }

  return [];
};
