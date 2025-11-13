// src/api/bookings.js
import http from "./http";

// ✅ Create a booking
export const createBooking = async (payload) =>
  (await http.post("/bookings", payload)).data;

// ✅ Get bookings for the logged-in user (by email filter)
export const myBookings = async (email) => {
  if (!email) return [];
  const { data } = await http.get("/bookings", {
    params: { email }, // -> /bookings?email=...
  });
  return Array.isArray(data) ? data : data || [];
};
