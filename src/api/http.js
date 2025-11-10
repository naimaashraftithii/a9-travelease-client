import axios from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
})

// You can add interceptors later for auth tokens
export default http
