import http from "./http";

// get all vehicles
export const fetchVehicles = async (params = {}) =>
  (await http.get("/vehicles", { params })).data;

// get single
export const fetchVehicle = async (id) =>
  (await http.get(`/vehicles/${id}`)).data;

// add
export const createVehicle = async (payload) =>
  (await http.post("/vehicles", payload)).data;

// update
export const updateVehicle = async (id, payload) =>
  (await http.patch(`/vehicles/${id}`, payload)).data;

// delete
export const deleteVehicle = async (id) =>
  (await http.delete(`/vehicles/${id}`)).data;
