// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./context/AuthProvider.jsx";   // ✅ FIXED
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import AllVehicles from "./pages/AllVehicles.jsx";
import AddVehicle from "./pages/AddVehicle.jsx";
import MyVehicles from "./pages/MyVehicles.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import VehicleDetails from "./pages/VehicleDetails.jsx";
import UpdateVehicle from "./pages/UpdateVehicle.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./routes/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "allVehicles", element: <AllVehicles /> },
      {
        path: "addVehicle",
        element: (
          <PrivateRoute>
            <AddVehicle />
          </PrivateRoute>
        ),
      },
      {
        path: "myVehicles",
        element: (
          <PrivateRoute>
            <MyVehicles />
          </PrivateRoute>
        ),
      },
      {
        path: "myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "vehicles/:id",
        element: (
          <PrivateRoute>
            <VehicleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "update-vehicle/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),
      },
      { path: "register", element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
