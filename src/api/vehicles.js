// src/api/vehicles.js
import http from "./http";

// 🔹 Get vehicles list (used by AllVehicles, MyVehicles)
export const fetchVehicles = async (params = {}) => {
  try {
    const { data } = await http.get("/vehicles", { params });

    // server sends { items: [...] }
    if (Array.isArray(data)) {
      return { items: data, total: data.length };
    }
    return data; // { items, total? }
  } catch (err) {
    console.error("fetchVehicles error:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Get single vehicle by id
export const fetchVehicle = async (id) => {
  try {
    const { data } = await http.get(`/vehicles/${id}`);
    return data;
  } catch (err) {
    console.error("fetchVehicle error:", id, err.response?.status, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Create vehicle (requires auth token)
export const createVehicle = async (payload) => {
  try {
    const { data } = await http.post("/vehicles", payload);
    return data;
  } catch (err) {
    console.error("createVehicle error:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Update vehicle (requires auth token)
export const updateVehicle = async (id, payload) => {
  try {
    const { data } = await http.patch(`/vehicles/${id}`, payload);
    return data;
  } catch (err) {
    console.error("updateVehicle error:", id, err.response?.status, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Delete vehicle (requires auth token)
export const deleteVehicle = async (id) => {
  try {
    const { data } = await http.delete(`/vehicles/${id}`);
    return data;
  } catch (err) {
    console.error("deleteVehicle error:", id, err.response?.status, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Summary (optional)
export const fetchVehicleSummary = async (id) => {
  try {
    const { data } = await http.get(`/vehicles/${id}/summary`);
    return data;
  } catch (err) {
    console.warn("fetchVehicleSummary error (optional):", err.message);
    return null;
  }
};

// 🔹 Latest 6 vehicles (Home.jsx)
export const fetchLatestVehicles = async () => {
  try {
    const { data } = await http.get("/latest-vehicles");
    // server returns an array
    return Array.isArray(data) ? data : data.items || [];
  } catch (err) {
    console.error("fetchLatestVehicles error:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Top vehicles by bookings (Home.jsx)
export const fetchTopVehicles = async (limit = 3) => {
  try {
    const { data } = await http.get("/stats/top-vehicles", {
      params: { limit },
    });
    return Array.isArray(data) ? data : data.items || [];
  } catch (err) {
    console.error("fetchTopVehicles error:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
};
