// src/api/bookings.js
import http from "./http"; // ⬅️ use the axios instance, NOT './vehicles'

// Create a booking
export const createBooking = async (payload) =>
  (await http.post("/bookings", payload)).data;

// Get bookings for the logged-in user
export const myBookings = async () =>
  (await http.get("/bookings/my")).data;
