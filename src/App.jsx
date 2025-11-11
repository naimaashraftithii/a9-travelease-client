// src/App.jsx
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AllVehicles from './pages/AllVehicles'
import VehicleDetails from './pages/VehicleDetails'
import AddVehicle from './pages/AddVehicle'
import MyVehicles from './pages/MyVehicles'
import MyBookings from './pages/MyBookings'   // ✅ only ONE import
import UpdateVehicle from './pages/UpdateVehicle'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<AllVehicles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/vehicles/:id" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
          <Route path="/add-vehicle" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>} />
          <Route path="/my-vehicles" element={<ProtectedRoute><MyVehicles /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/update-vehicle/:id" element={<ProtectedRoute><UpdateVehicle /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
