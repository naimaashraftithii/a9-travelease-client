import http from "./http";

// ✅ Get bookings for logged-in user (server uses token email)
export const myBookings = async () => {
  const { data } = await http.get("/my-bookings");
  return Array.isArray(data) ? data : data || [];
};
