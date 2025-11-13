
import http from "./http";

//  Create booking
export const createBooking = async (payload) => {
  const { data } = await http.post("/bookings", payload);
  return data;
};

export const myBookings = async () => {
  const { data } = await http.get("/my-bookings");

  return Array.isArray(data) ? data : data || [];
};
