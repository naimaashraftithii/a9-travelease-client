import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response?.data || err)
);

export default http;
