
import { Routes, Route } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import AllVehicles from "./pages/AllVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import AddVehicle from "./pages/AddVehicle";
import MyVehicles from "./pages/MyVehicles";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const isFetching = useIsFetching();

  return (
    <>
      {isFetching > 0 && <Loader fullscreen text="Loading..." />}

      <Navbar />

      <div className="min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/allVehicles" element={<AllVehicles />} />

          <Route
            path="/vehicles/:id"
            element={
              <ProtectedRoute>
                <VehicleDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addVehicle"
            element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myVehicles"
            element={
              <ProtectedRoute>
                <MyVehicles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myBookings"
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
