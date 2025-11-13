// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CarouselOne from "./components/CarouselOne"; // ⬅️ add

// Pages
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import AddVehicle from "./pages/AddVehicle";
import MyVehicles from "./pages/MyVehicles";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const isFetching = useIsFetching();

  return (
    <>
      {isFetching > 0 && <Loader fullscreen text="Loading..." />}
      <Navbar />
      <CarouselOne /> {/* ✅ shows under navbar on every page */}

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
