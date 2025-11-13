
import http from "./http";

// Get vehicles 
export const fetchVehicles = async (params = {}) => {
  const { data } = await http.get("/vehicles", { params });
  if (Array.isArray(data)) return { items: data, total: data.length };
  return data;
};

// Get vehicle
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

// Book vehicle 
export const bookVehicle = async (vehicleId, status = "requested") =>
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

export const fetchLatestVehicles = async () => {
  const { data } = await http.get("/latest-vehicles");
  if (Array.isArray(data)) return data;
  return data.items || [];
};
