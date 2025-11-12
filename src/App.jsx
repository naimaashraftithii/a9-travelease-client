// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages (import each exactly once)
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";            // if you have a listing page
import VehicleDetails from "./pages/VehicleDetails"; // if you have a details page
import AddVehicle from "./pages/AddVehicle";
import MyVehicles from "./pages/MyVehicles";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NoTFound";            // ← keep only THIS NotFound

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route
            path="/vehicles/:id"
            element={
              <ProtectedRoute>
                <VehicleDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-vehicle"
            element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-vehicles"
            element={
              <ProtectedRoute>
                <MyVehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
     <Footer/>
    </>
  );
}
