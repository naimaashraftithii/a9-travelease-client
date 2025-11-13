import http from "./http";

// create booking
export const createBooking = async (payload) =>
  (await http.post("/bookings", payload)).data;

// get bookings of current user
export const fetchBookings = async (email) =>
  (await http.get(`/bookings?email=${email}`)).data;
